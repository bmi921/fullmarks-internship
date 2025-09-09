from playwright.sync_api import sync_playwright
import json
import time

start_year = 2011
end_year = 2023
all_characters = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    for year in range(start_year, end_year+1):
        for page_num in [1, 2]:
            url = f"https://yurugp.jp/yvs/vote/rankings/year/{year}?page={page_num}"
            print(f"Fetching {year} page {page_num}...")
            page = browser.new_page()
            page.goto(url)
            # JS描画された ul.chararank li を待機
            page.wait_for_selector("ul.chararank li")

            lis = page.query_selector_all("ul.chararank li")
            for li in lis:
                name = li.query_selector("h4").inner_text().strip()
                pref = li.query_selector("span.country").inner_text().strip("()")
                img_src = li.query_selector("img").get_attribute("src")
                if img_src and img_src.startswith("/"):
                    img_src = "https://yurugp.jp" + img_src

                all_characters.append({
                    "name": name,
                    "prefecture": pref,
                    "imagePath": img_src,
                    "year": year
                })

            page.close()
            time.sleep(1)  # サーバー負荷と発見防止のための間隔

    browser.close()

# JSON出力
with open("characters.json", "w", encoding="utf-8") as f:
    json.dump(all_characters, f, ensure_ascii=False, indent=2)

print(f"Scraped total: {len(all_characters)} characters")
