# 26Sabbatical

A stylish countdown timer web app tracking multiple upcoming events with real-time updates and a modern glassmorphic UI.

## About

This project displays live countdowns to three exciting events:
- **Secret Trip** – June 5, 2026
- **Sabbatical** – June 12, 2026  
- **France** – July 4, 2026

Each event shows the days remaining, hours, minutes, and seconds, along with a visual progress bar indicating how far through the countdown period you are.

## Features

✨ **Real-time Countdown Updates** – Live ticker updates every second  
🎨 **Modern UI Design** – Glassmorphic aesthetic with animated grid background  
🌈 **Color-coded Events** – Each countdown has its own accent color scheme  
📱 **Fully Responsive** – Works seamlessly on desktop, tablet, and mobile  
⚡ **Lightweight** – Pure HTML/CSS/JavaScript with no dependencies  
🎯 **Progress Visualization** – Visual progress bar for each event  

## Tech Stack

- **HTML** – Semantic markup structure
- **CSS** – Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript** – Real-time countdown calculations and DOM updates

## How It Works

The `script.js` file calculates the time difference between the current moment and each target event:

1. **Initial Load** – `tick()` function runs immediately to calculate and display initial values
2. **Continuous Updates** – `setInterval()` calls `tick()` every 1000ms for real-time updates
3. **Time Breakdown** – Converts milliseconds to days, hours, minutes, and seconds
4. **Progress Calculation** – Tracks elapsed time since May 26, 2026 to update progress bars

The styling uses CSS custom properties for easy theming, with distinct color schemes:
- Sabbatical: Lime/Yellow accent
- France: Cyan/Orange accent
- Secret Trip: Purple/Pink accent

## Getting Started

Simply open `index.html` in your browser. No build process or dependencies required.

```bash
# Clone the repository
git clone https://github.com/yourusername/26sabbatical.git

# Open in browser
open index.html
```

## Files

- `index.html` – Markup structure and event definitions
- `styles.css` – All styling, animations, and responsive design
- `script.js` – Countdown logic and DOM updates
- `icons8-clock-glassmorphism-32.png` – Favicon

## Browser Support

Works in all modern browsers supporting:
- CSS Grid & Flexbox
- CSS Custom Properties
- ES6 JavaScript

## License

Open source – feel free to use, modify, and adapt for your own events!
