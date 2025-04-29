# 🖱️ Animated Mouse

**Animated Mouse** is a lightweight JavaScript library that creates a dynamic logo cursor that follows the mouse and reacts to hovered elements with smooth animations.

Use it to give your website a unique interactive flair with hover-based shape changes like **rectangle**, **circle**, **underline**, or even custom image highlights.

---

## 🚀 Quick Start (via CDN)

### 📥 1. Include CSS in `<head>`

```html
<link rel="stylesheet" href="https://unpkg.com/animated-mouse/animated-mouse.min.css">
```

---

### 📜 2. Add Scripts before `</body>`

```html
<!-- jQuery (required) -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
        crossorigin="anonymous"></script>

<!-- GSAP (required) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<!-- Animated Mouse -->
<script src="https://unpkg.com/animated-mouse/animated-mouse.min.js"></script>
```

---

### 🎨 3. Add Theme Customization to CSS

In your stylesheet:

```css
:root {
  --animated-mouse-main-color: #eb2227;                    /* Main accent color */
  --animated-mouse-logo: url('https://example.com/path/to/your-logo.svg');             /* Full path to your logo (SVG recommended) */
}
```

---

### 🧩 4. Apply to HTML Elements

To apply the effect:

```html
<button class="animate-mouse" data-mouse-class="rectangle">Click Me</button>
```

---

## 🧙 Shape Options

Use `data-mouse-class` on any element with `class="animate-mouse"`:

| Value             | Description                            |
|-------------------|----------------------------------------|
| `rectangle`       | Adds a rectangular hover highlight     |
| `circle`          | Circular hover effect                  |
| `underline`       | Smooth underline animation             |

---

## 🔧 Advanced Customizations

### Custom Underline Style

```css
.custom-cursor.title-underline {
  background-image: none;
  border-radius: 0;
  border-bottom: 4px solid var(--animated-mouse-main-color);
  margin-top: 2px;
}
```

```html
<h2 class="animate-mouse" data-mouse-class="title-underline">Hover Me</h2>
```

---

### Custom Image Cursor

```css
.custom-cursor.image-example {
  background-image: url('your-image-url.jpg');
}
```

```html
<div class="animate-mouse" data-mouse-class="image-example">Hover Me</div>
```

---

## 📦 npm Install (Optional)

```bash
npm i animated-mouse
```

Then import manually in your project:

```html
<link rel="stylesheet" href="node_modules/animated-mouse/animated-mouse.min.css">
<script src="node_modules/animated-mouse/animated-mouse.min.js"></script>
```

---

## 📝 License

Released under the [MIT License](LICENSE).  
Feel free to use, modify, and share — attribution is appreciated!