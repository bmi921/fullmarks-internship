from playwright.sync_api import sync_playwright
import json
import time

start_year = 2011
end_year = 2023
all_characters = []
seen_names = set()  

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    for year in range(start_year, end_year+1):
        for page_num in [1, 2]:
            url = f"https://yurugp.jp/yvs/vote/rankings/year/{year}?page={page_num}"
            print(f"Fetching {year} page {page_num}...")
            page = browser.new_page()
            page.goto(url)
            page.wait_for_selector("ul.chararank li")

            lis = page.query_selector_all("ul.chararank li")
            for li in lis:
                name = li.query_selector("h4").inner_text().strip()

                if name in seen_names:
                    print(f"Skipping duplicate: {name}")
                    continue

                pref = li.query_selector("span.country").inner_text().strip("()")
                img_src = li.query_selector("img").get_attribute("src")
                if img_src and img_src.startswith("/"):
                    img_src = "https://yurugp.jp" + img_src

                # 詳細ページのリンクを取得
                detail_link = li.query_selector("a").get_attribute("href")
                description = ""
                if detail_link:
                    if detail_link.startswith("/"):
                        detail_link = "https://yurugp.jp" + detail_link
                    # 詳細ページへ遷移
                    detail_page = browser.new_page()
                    detail_page.goto(detail_link, timeout=60000, wait_until="domcontentloaded")

                    try:
                        detail_page.wait_for_selector("div.prof", timeout=5000)
                        prof_block = detail_page.query_selector("div.prof")
                        paragraphs = prof_block.query_selector_all("p")
                        description = "\n".join([p.inner_text().strip() for p in paragraphs if p.inner_text().strip()])
                    except Exception:
                        description = ""
                    finally:
                        detail_page.close()

                all_characters.append({
                    "name": name,
                    "prefecture": pref,
                    "imagePath": img_src,
                    "year": year,
                    "description": description
                })
                seen_names.add(name)  
                print(f"Added: {name}")

            page.close()
            time.sleep(1)

    browser.close()

# JSON出力
with open("characters3.json", "w", encoding="utf-8") as f:
    json.dump(all_characters, f, ensure_ascii=False, indent=2)

print(f"Scraped total: {len(all_characters)} characters")
