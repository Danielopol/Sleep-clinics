"""
Build a ZIP-code -> centroid lookup from the US Census Gazetteer ZCTA file.

This produces scripts/zip-centroids.json (checked into git), used by
generate-clinic-data.mjs as a fallback location for clinics whose street address
could not be matched by the Census street-level geocoder.

Source: US Census Gazetteer (public domain, no API key).
Run once (or yearly to refresh):  python scripts/build-zip-centroids.py
"""
import io
import json
import os
import urllib.request
import zipfile

YEAR = "2024"
URL = f"https://www2.census.gov/geo/docs/maps-data/data/gazetteer/{YEAR}_Gazetteer/{YEAR}_Gaz_zcta_national.zip"
OUT = os.path.join(os.path.dirname(__file__), "zip-centroids.json")


def main():
    print(f"Downloading Census Gazetteer ZCTA file ({YEAR})...")
    data = urllib.request.urlopen(URL, timeout=120).read()

    with zipfile.ZipFile(io.BytesIO(data)) as zf:
        name = next(n for n in zf.namelist() if n.lower().endswith(".txt"))
        raw = zf.read(name).decode("latin-1")

    lines = raw.splitlines()
    header = [h.strip() for h in lines[0].split("\t")]
    geoid_i = header.index("GEOID")
    lat_i = header.index("INTPTLAT")
    # The longitude column name has trailing whitespace in some years.
    lng_i = next(i for i, h in enumerate(header) if h.startswith("INTPTLONG"))

    centroids = {}
    for line in lines[1:]:
        if not line.strip():
            continue
        cols = line.split("\t")
        zip_code = cols[geoid_i].strip()
        try:
            lat = round(float(cols[lat_i].strip()), 5)
            lng = round(float(cols[lng_i].strip()), 5)
        except (ValueError, IndexError):
            continue
        centroids[zip_code] = {"lat": lat, "lng": lng}

    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(centroids, f, separators=(",", ":"))

    print(f"Wrote {len(centroids)} ZIP centroids to {OUT}")


if __name__ == "__main__":
    main()
