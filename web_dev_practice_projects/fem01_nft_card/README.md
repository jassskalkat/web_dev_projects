# Frontend Mentor - NFT preview card component solution
This is a solution to the [NFT preview card component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/nft-preview-card-component-SbdUL_w0U).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)



## --- Overview ---

### The challenge
Users should be able to:
- View the optimal layout depending on their device's screen size
- See hover states for interactive elements

### Screenshot
- [On desktop](solution-screenshots/desktop_screenshot.jpg)
- [On desktop hovered](solution-screenshots/desktop_focused_screenshot.jpg)
- [On mobile screen](solution-screenshots/mobile_screenshot.jpg)

### Links
- Solution URL: [FrontEnd Mentor: My Solution](https://www.frontendmentor.io/solutions/nft-card-component-solution-using-flexbox-F8Dt9QZse)
- Live Site URL: [GitHub Page: NFT Card](https://anoshaahmed.github.io/fem01-nft-card/)


## --- My process ---

### Built with
- HTML5
- CSS
- Flexbox

### What I learned
This was the first project I did that was not a "codeAlong" so I learned a lot of things with a deeper understanding. This project reinforced my understanding of:
- flexbox
- position: i learned how the position of the parent element impacts the position of what's inside of it
- planning: i learned how to plan on my code and be organized with it; for example, wrapping everything in a section, wrapping all the rows in a section etc.
- how to give a picture a round border: by adding a background with a 50% radius
- similarly, how to have a layer of color show up on a picture when it is hovered over using css:
```css
.bigpic .bluebox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 255, 247, 0.8);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    cursor: pointer;
}
.bigpic .bluebox:hover {
    opacity: 1;
}
```
- i also learned to add an attribution: where to put it in the html, and how to position it using css flexbox
- CSS box-shadow property:
```css
section {
    box-shadow: 6px 32px 35px #0c1729, -6px -2px 35px #0c1729;
}
```

### Continued development
In the future, i aim to:
- learn the position property in more depth
- better organize html
- utilize css grid

### Useful resources
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow) - This helped me with the box shadow property.
- [ImageColorPicker.COM](https://imagecolorpicker.com/) - I love this website for picking a color from an image. I simply take a screenshot of my screen and paste it, then I can easily pick the color.


## --- Author ---
- Website - [Anosha Ahmed](https://www.anoshaahmed.com) *i have not created my website yet but i will soon.*
- Frontend Mentor - [@anoshaahmed](https://www.frontendmentor.io/profile/anoshaahmed)
- GitHub - [@anoshaahmed](https://github.com/anoshaahmed)
- Twitter - [@anosha1ahmed](https://www.twitter.com/anosha1ahmed)
