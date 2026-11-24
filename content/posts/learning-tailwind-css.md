---
title: What I Learned Building My First Site with Tailwind CSS
date: 2026-11-20
tags: [css, tailwind]
summary: Utility classes felt strange at first. Here is what made them click.
---

When I first saw Tailwind code, I thought it looked messy. A button with fifteen classes? Really? But after building this blog with it, I changed my mind.

## The first impression

Here is a normal-looking button in Tailwind:

```html
<button class="rounded-md bg-green-300 px-4 py-2 font-semibold">
  Click me
</button>
```

Every class does **one small thing**. Once you know the pattern, you can read it like a sentence: rounded corners, green background, some padding, bold text.

## Three ideas that made it click

### 1. Classes are tiny CSS rules

`p-4` is just `padding: 1rem`. `text-xl` is just a bigger font. Nothing magic.

### 2. Mobile first

A class without a prefix applies everywhere. A class with `md:` only applies on bigger screens.

| Class          | Phone | Tablet & up |
| -------------- | ----- | ----------- |
| `flex-col`     | ✅    | ✅          |
| `md:flex-row`  | ❌    | ✅          |

### 3. The theme is the source of truth

I put my colours in one place, and the whole site follows:

```css
@theme {
  --color-leaf: #8fbfa3;
}
```

> Change one line, and every `text-leaf` on the site updates. That was the moment I was convinced.

## What I would tell a beginner

- Don't memorise classes. Look them up as you go.
- Build small components and reuse them.
- Use your browser's responsive mode often.

## Wrapping up

Tailwind isn't about writing less CSS. It's about never leaving your HTML to style it. Give it a week before you judge it.
