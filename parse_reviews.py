import json
import re

def parse_reviews():
    with open('reviews.txt', 'r') as f:
        content = f.read()

    # Find the big array starting with [["wrb.fr"
    # The format in the file is:
    # )]}'
    # length
    # [[...]]

    # We can try to find the line that contains "wrb.fr"
    lines = content.split('\n')
    data_line = None
    for line in lines:
        if 'wrb.fr' in line:
            data_line = line
            break

    if not data_line:
        print("Could not find data line")
        return

    try:
        # The line is a JSON array
        data = json.loads(data_line)
        # data[0] is ["wrb.fr", "s7jv5e", "INNER_JSON", ...]
        inner_json_str = data[0][2]
        inner_data = json.loads(inner_json_str)

        # Now we need to navigate inner_data to find reviews
        # inner_data structure seems to be:
        # [null, null, [REVIEW_LIST, ...], ...]
        # Let's look for the list.

        # Based on the read output:
        # [null,5,["um mês atrás",...], ["Pamela Sousa", ...], ...]
        # It seems each review is an item in a list.

        # Let's inspect inner_data[2] which seems to be the list of reviews
        reviews_raw = inner_data[2]

        # Let's inspect the first item structure in detail to debug
        if len(reviews_raw) > 0:
            print("DEBUG: First item structure:")
            print(json.dumps(reviews_raw[0], indent=2, ensure_ascii=False))

        cleaned_reviews = []

        for item in reviews_raw:
            # item structure based on the snippet:
            # [
            #   null,
            #   5, (Rating?)
            #   ["um mês atrás", ...], (Time)
            #   ["Pamela Sousa", "avatar_url", ...], (User info)
            #   ...
            # ]

            try:
                # User info is usually at index 1 (not 3? let's check debug output)
                # Actually, in the snippet earlier:
                # [null,5,["um mês atrás",...], ["Pamela Sousa", ...]]
                # 0: null
                # 1: 5 (rating?)
                # 2: ["um mês atrás", ...] (date)
                # 3: ["Pamela Sousa", ...] (user)

                # Let's rely on the debug output to fix indices.
                # For now, I will guess indices based on previous observation but I'll make it safe.

                rating = item[1] # usually int

                date_str = ""
                if len(item) > 2 and item[2]:
                    date_str = item[2][0]

                user_info = item[3] if len(item) > 3 else None
                name = user_info[0] if user_info else "Anonymous"
                avatar = user_info[1] if user_info else ""

                # Text search: look for the longest string that has spaces
                text = ""
                candidates = []
                for field in item:
                    if isinstance(field, str):
                        candidates.append(field)

                # The review text is usually the longest string
                candidates.sort(key=len, reverse=True)
                for c in candidates:
                    if "http" not in c and " " in c:
                        text = c
                        break

                # If text is still empty or looks like base64 (no spaces or very few), try specific index
                # In the raw file, "Um advogado sensacional..." was present.

                cleaned_reviews.append({
                    "name": name,
                    "avatar": avatar,
                    "rating": rating,
                    "date": date_str,
                    "text": text
                })
            except Exception as e:
                # print(f"Error parsing item: {e}")
                continue


        print(json.dumps(cleaned_reviews, indent=2, ensure_ascii=False))

        # Save to file
        with open('lib/data/google-reviews.json', 'w') as f:
            json.dump(cleaned_reviews, f, indent=2, ensure_ascii=False)

    except Exception as e:
        print(f"Error parsing JSON: {e}")

if __name__ == "__main__":
    parse_reviews()
