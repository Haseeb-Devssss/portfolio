// ==========================================
// 1. MOBILE MENU
// ==========================================
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuBtn.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("open");
  });
});

// ==========================================
// 2. NAVBAR SHRINKS WHEN YOU SCROLL
// ==========================================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ==========================================
// 3. SLIDING BUBBLE BEHIND NAV LINKS
// ==========================================
const bubble = document.getElementById("navBubble");

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    bubble.style.left = link.offsetLeft + "px";
    bubble.style.width = link.offsetWidth + "px";
    bubble.style.opacity = "1";
  });
});

navLinks.addEventListener("mouseleave", () => {
  bubble.style.opacity = "0";
});

// ==========================================
// 4. MAGNETIC BUTTONS (move slightly towards the mouse)
// ==========================================
document.querySelectorAll(".magnetic").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.5}px, ${y * 0.35}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
  });
});

// ==========================================
// 5. TYPING EFFECT
// ==========================================
const words = ["websites", "AI chatbots", "automations", "n8n workflows", "landing pages"];
const typed = document.getElementById("typed");

let wordIndex = 0;
let charIndex = words[0].length;
let deleting = true;

function typeLoop() {
  const word = words[wordIndex];
  typed.textContent = word.slice(0, charIndex);

  if (deleting) {
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length; // next word, back to 0 at the end
    }
  } else {
    charIndex++;
    if (charIndex === words[wordIndex].length) {
      deleting = true;
      setTimeout(typeLoop, 1800); // pause on the full word
      return;
    }
  }

  setTimeout(typeLoop, deleting ? 50 : 100);
}

// Skip the animation for people who prefer less motion
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setTimeout(typeLoop, 1800);
}


// ==========================================
// 6. CURSOR SPOTLIGHT (only on devices with a mouse)
// ==========================================
const glow = document.getElementById("cursorGlow");
const hasMouse = window.matchMedia("(hover: hover)").matches;

if (hasMouse) {
  let mouseX = 0, mouseY = 0; // where the mouse is
  let glowX = 0, glowY = 0;   // where the glow is

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.classList.add("visible");
  });

  // Move the glow 10% of the way to the mouse every frame, so it trails smoothly
  function moveGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    glow.style.transform = `translate(${glowX}px, ${glowY}px)`;
    requestAnimationFrame(moveGlow);
  }
  moveGlow();
}

// ==========================================
// 7. LIGHT INSIDE SERVICE CARDS FOLLOWS THE MOUSE
// ==========================================
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", e.clientX - rect.left + "px");
    card.style.setProperty("--y", e.clientY - rect.top + "px");
  });
});