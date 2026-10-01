import sys

with open('D:/SRIN Project/New ETS/web/web/styles.css', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Padding adjustments for sections
content = content.replace(
    '.device-support-section {\n    padding: var(--space-4xl) 0;\n}',
    '.device-support-section {\n    padding: 0;\n}\n.product-section .section-container {\n    padding-top: var(--space-4xl);\n    padding-bottom: 0;\n}\n.device-support-section .section-container {\n    padding-top: var(--space-4xl);\n    padding-bottom: 0;\n}'
)
content = content.replace(
    '.coverage-section {\n    padding-top: var(--space-4xl);\n    padding-bottom: 0;\n    position: relative;\n    overflow: visible; /* Prevents clipping of tooltips like New Zealand */\n    margin-top: -60px; /* Pull the section up closer to the previous one */\n}',
    '.coverage-section {\n    padding-top: 0;\n    padding-bottom: 0;\n    position: relative;\n    overflow: visible;\n    margin-top: 0;\n}\n.coverage-section .section-container {\n    padding-top: var(--space-4xl);\n}'
)

# 2. Map container and viewport
content = content.replace(
    '.map-container {\n    position: relative;\n    width: 100%;\n    max-width: 1000px;\n    margin: -20px auto -15% auto; /* Negative top margin to bring it extremely close to subtitle */\n    aspect-ratio: 950 / 620;\n    background: transparent;\n    border-radius: var(--shape-corner-xl);\n}',
    '.map-viewport {\n    margin: -20px auto -15% auto;\n    overflow: hidden;\n    position: relative;\n    border-radius: var(--shape-corner-xl);\n}\n.map-container {\n    position: relative;\n    width: 160%;\n    max-width: 1600px;\n    margin-left: -60%;\n    margin-top: -33%;\n    margin-bottom: -15%;\n    aspect-ratio: 950 / 620;\n    background: transparent;\n}'
)

# 3. Map overlay sizing
content = content.replace(
    '    background-image: url(''assets/world-map.svg'');\n    background-size: contain;',
    '    background-image: url(''assets/world-map.svg'');\n    background-size: 100% 100%;'
)

# 4. Tab button padding and size
content = content.replace(
    '    padding: 12px 22px;\n    text-align: center;\n    font-family: \'Google Sans Flex\', \'Google Sans\', \'Inter\', sans-serif;\n    font-size: 0.95rem;',
    '    padding: 16px 32px;\n    text-align: center;\n    font-family: \'Google Sans Flex\', \'Google Sans\', \'Inter\', sans-serif;\n    font-size: 1.15rem;'
)

content = content.replace(
    '    font-size: 20px;\n    transition: all 0.22s ease;\n    font-variation-settings: \'FILL\' 0, \'wght\' 400, \'GRAD\' 0, \'opsz\' 20;',
    '    font-size: 24px;\n    transition: all 0.22s ease;\n    font-variation-settings: \'FILL\' 0, \'wght\' 400, \'GRAD\' 0, \'opsz\' 24;'
)

# 5. Value customer section
content = content.replace(
    '.value-customer-section {\n    padding-bottom: var(--space-4xl);\n    margin-top: -60px; /* Pull it up closer to the map */\n}',
    '.value-customer-section {\n    padding-bottom: var(--space-4xl);\n    margin-top: -30px;\n}'
)

# 6. Marquee track images
content = content.replace(
    '.marquee-track img {\n    height: 40px;\n    max-width: 160px;\n    object-fit: contain;\n}',
    '.marquee-track img {\n    height: 55px;\n    max-width: 200px;\n    object-fit: contain;\n}'
)

with open('D:/SRIN Project/New ETS/web/web/styles.css', 'w', encoding='utf-8') as f:
    f.write(content)
print("Applied successfully")
