# Uncle Azumah Father's Day Tribute Website

Welcome! This is a modern, premium digital tribute website crafted for Uncle Azumah on Father's Day. It features a high-end luxury dark-gold design, smooth scroll animations, an interactive wishing board, a memories lightbox gallery, and a **built-in visual image customizer**.

---

## 🚀 How to Run the Website Locally

You can run this project locally on your machine in a couple of ways:

1. **Double-click `index.html`**:
   Simply open the folder in your Finder/File Explorer and double-click `index.html` to open it in your default web browser.

2. **Use a Local Server (Recommended)**:
   If you have Node.js/npm installed, you can launch a quick static server for the smoothest experience:
   ```bash
   npx serve .
   ```
   Or using Python:
   ```bash
   python3 -m http.server
   ```
   Then open `http://localhost:8000` or the port specified.

---

## 🎨 How to Customize Images

We have designed an **Interactive Customizer Mode** directly in the website to let you preview your own photos instantly before saving them.

### Step 1: Preview Live in Your Browser
1. Open the website in your browser.
2. Click the **Floating Gear Icon** at the bottom-left corner of the screen. This activates **Customizer Mode**.
3. A dashed gold border will appear around all customizable images, showing their file slot names (e.g., `images/father.jpg`).
4. **Drag-and-drop** any photo from your computer onto a dashed image slot, or **click the slot** to choose a file from your computer.
5. The page will immediately update to show your photo, letting you see how the final page looks!

### Step 2: Save the Changes Permanently
To make your customized image previews permanent, simply copy your photos into the `images/` directory on your computer and rename them to match the placeholder files exactly:

| File Slot | Description | Recommended Dimensions |
| :--- | :--- | :--- |
| 📁 `images/hero.jpg` | Abstract header backdrop | 1920 × 1080 px (Landscape) |
| 📁 `images/father.jpg` | Main portrait of Uncle Azumah | 800 × 800 px (Square) |
| 📁 `images/memory1.jpg` | First gallery memory (Family) | 1000 × 750 px (4:3) |
| 📁 `images/memory2.jpg` | Second gallery memory (Hobbies/Study) | 1000 × 750 px (4:3) |
| 📁 `images/memory3.jpg` | Third gallery memory (Sunset/Landscape) | 1000 × 750 px (4:3) |

*Note: For the best visual alignment, ensure you save them as `.jpg` files using these exact names.*

---

## ✍️ How to Customize Text, Timeline, and Messages

If you would like to edit the stories, names, years, or quotes:
1. Open `index.html` in any text editor (like VS Code, Cursor, or even TextEdit).
2. Use the search function (Command + F) to find names, years, or quotes.
3. Edit the text between the HTML tags (for example, change `<div class="timeline-year">1982</div>` to any year of your choice, or edit the paragraphs).
4. Save the file and refresh your browser.

---

## 💫 Advanced Details
- **Scroll Animations**: Uses native CSS Scroll-Driven Animations on modern browsers (Chrome/Edge 115+, Safari 19+). For Firefox and older browsers, it automatically falls back to an optimized `IntersectionObserver` script for smooth entry fades.
- **Performance**: High LCP prioritization with `fetchpriority="high"` on the hero image and standard aspect ratio bounding boxes to eliminate Cumulative Layout Shift (CLS).
