$content = Get-Content "D:\SRIN Project\New ETS\web\web\styles.css" -Raw

$content = $content.Replace(
    ".device-support-section {
    padding: var(--space-4xl) 0;
}",
    ".device-support-section {
    padding: 0;
}
.product-section .section-container {
    padding-top: var(--space-4xl);
    padding-bottom: 0;
}
.device-support-section .section-container {
    padding-top: var(--space-4xl);
    padding-bottom: 0;
}"
)

$content = $content.Replace(
    ".coverage-section {
    padding-top: var(--space-4xl);
    padding-bottom: 0;
    position: relative;
    overflow: visible; /* Prevents clipping of tooltips like New Zealand */
    margin-top: -60px; /* Pull the section up closer to the previous one */
}",
    ".coverage-section {
    padding-top: 0;
    padding-bottom: 0;
    position: relative;
    overflow: visible;
    margin-top: 0;
}
.coverage-section .section-container {
    padding-top: var(--space-4xl);
}"
)

$content = $content.Replace(
    ".map-container {
    position: relative;
    width: 100%;
    max-width: 1000px;
    margin: -20px auto -15% auto; /* Negative top margin to bring it extremely close to subtitle */
    aspect-ratio: 950 / 620;
    background: transparent;
    border-radius: var(--shape-corner-xl);
}",
    ".map-viewport {
    margin: -20px auto -15% auto;
    overflow: hidden;
    position: relative;
    border-radius: var(--shape-corner-xl);
}
.map-container {
    position: relative;
    width: 160%;
    max-width: 1600px;
    margin-left: -60%;
    margin-top: -33%;
    margin-bottom: -15%;
    aspect-ratio: 950 / 620;
    background: transparent;
}"
)

$content = $content.Replace(
    "    background-image: url('assets/world-map.svg');
    background-size: contain;",
    "    background-image: url('assets/world-map.svg');
    background-size: 100% 100%;"
)

$content = $content.Replace(
    "    padding: 12px 22px;
    text-align: center;
    font-family: 'Google Sans Flex', 'Google Sans', 'Inter', sans-serif;
    font-size: 0.95rem;",
    "    padding: 16px 32px;
    text-align: center;
    font-family: 'Google Sans Flex', 'Google Sans', 'Inter', sans-serif;
    font-size: 1.15rem;"
)

$content = $content.Replace(
    "    font-size: 20px;
    transition: all 0.22s ease;
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;",
    "    font-size: 24px;
    transition: all 0.22s ease;
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;"
)

$content = $content.Replace(
    ".value-customer-section {
    padding-bottom: var(--space-4xl);
    margin-top: -60px; /* Pull it up closer to the map */
}",
    ".value-customer-section {
    padding-bottom: var(--space-4xl);
    margin-top: -30px;
}"
)

$content = $content.Replace(
    ".marquee-track img {
    height: 40px;
    max-width: 160px;
    object-fit: contain;
}",
    ".marquee-track img {
    height: 55px;
    max-width: 200px;
    object-fit: contain;
}"
)

Set-Content -Path "D:\SRIN Project\New ETS\web\web\styles.css" -Value $content -Encoding UTF8
