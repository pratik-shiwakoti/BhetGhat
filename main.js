// Global variables
let currentLanguage = "en"
let currentTheme = "light"

// DOM elements
const themeToggle = document.getElementById("theme-toggle")
const themeIcon = document.getElementById("theme-icon")
const langToggle = document.getElementById("lang-toggle")
const langText = document.getElementById("lang-text")
const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const navMenu = document.getElementById("nav-menu")
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const filterBtns = document.querySelectorAll(".filter-btn")
const chatbotToggle = document.getElementById("chatbot-toggle")
const chatbotWindow = document.getElementById("chatbot-window")
const chatbotClose = document.getElementById("chatbot-close")
const chatbotInput = document.getElementById("chatbot-input")
const chatbotSend = document.getElementById("chatbot-send")
const chatbotMessages = document.getElementById("chatbot-messages")

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme()
  initializeLanguage()
  loadFeedContent()
  setupEventListeners()
})

// Theme Management
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"
  setTheme(savedTheme)
}

function setTheme(theme) {
  currentTheme = theme
  document.documentElement.setAttribute("data-theme", theme)

  // Update theme icon
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun"
    // Update logos for dark theme
    updateLogosForTheme("dark")
  } else {
    themeIcon.className = "fas fa-moon"
    // Update logos for light theme
    updateLogosForTheme("light")
  }

  localStorage.setItem("theme", theme)
}

function updateLogosForTheme(theme) {
  const logos = document.querySelectorAll("#logo, #footer-logo")
  logos.forEach((logo) => {
    if (theme === "dark") {
      logo.src = "darklogo.png"
    } else {
      logo.src = "logo.png"
    }
  })
}

function toggleTheme() {
  const newTheme = currentTheme === "light" ? "dark" : "light"
  setTheme(newTheme)
}

// Language Management
function initializeLanguage() {
  const savedLanguage = localStorage.getItem("language") || "en"
  setLanguage(savedLanguage)
}

function setLanguage(lang) {
  currentLanguage = lang
  langText.textContent = lang.toUpperCase()

  // Update all translatable elements
  const translatableElements = document.querySelectorAll("[data-en], [data-np]")
  translatableElements.forEach((element) => {
    const text = element.getAttribute(`data-${lang}`)
    if (text) {
      element.textContent = text
    }
  })

  // Update placeholders
  const placeholderElements = document.querySelectorAll(`[data-${lang}-placeholder]`)
  placeholderElements.forEach((element) => {
    const placeholder = element.getAttribute(`data-${lang}-placeholder`)
    if (placeholder) {
      element.placeholder = placeholder
    }
  })

  localStorage.setItem("language", lang)
}

function toggleLanguage() {
  const newLanguage = currentLanguage === "en" ? "np" : "en"
  setLanguage(newLanguage)
}

// Mobile Menu
function toggleMobileMenu() {
  navMenu.classList.toggle("active")
}

// Search Functionality
function performSearch() {
  const query = searchInput.value.trim()
  const activeFilter = document.querySelector(".filter-btn.active").getAttribute("data-filter")

  if (query) {
    console.log(`Searching for: "${query}" in category: ${activeFilter}`)
    // Here you would implement actual search logic
    // For now, we'll just show a simple alert
    alert(`Searching for "${query}" in ${activeFilter} category`)
  }
}

function setActiveFilter(clickedBtn) {
  filterBtns.forEach((btn) => btn.classList.remove("active"))
  clickedBtn.classList.add("active")
}

// Feed Content Loading
function loadFeedContent() {
  loadLatestPosts()
  loadCreativeWorks()
  loadUpcomingEvents()
}

function loadLatestPosts() {
  const container = document.getElementById("latest-posts")
  const posts = [
    {
      title: "Welcome to our Digital Chautari!",
      author: "Admin",
      time: "2 hours ago",
      excerpt: "Join our growing community of learners, creators, and innovators...",
      likes: 2,
      comments: 0,
    },
    {
      title: "Tips for Better Community Engagement",
      author: "Pratik Shiwakoti",
      time: "5 hours ago",
      excerpt: "Here are some ways to make the most of your BhetGhat experience...",
      likes: 1,
      comments: 0,
    },
  ]

  container.innerHTML = posts.map((post) => createPostCard(post)).join("")
}

function loadCreativeWorks() {
  const container = document.getElementById("creative-works")
  const works = [
    {
      title: "Mountain Sunrise",
      author: "Raj Thapa",
      type: "Photography",
      time: "1 day ago",
      likes: 45,
      comments: 6,
    },
    {
      title: "Digital Nepal",
      author: "Maya Gurung",
      type: "Poem",
      time: "2 days ago",
      likes: 32,
      comments: 15,
    },
  ]

  container.innerHTML = works.map((work) => createCreativeCard(work)).join("")
}

function loadUpcomingEvents() {
  const container = document.getElementById("upcoming-events")
  const events = [
    {
      title: "Web Development Workshop",
      organizer: "Tech Community Nepal",
      date: "Dec 15, 2024",
      time: "2:00 PM",
      attendees: 45,
      type: "Workshop",
    },
    {
      title: "Poetry Reading Session",
      organizer: "Creative Writers Circle",
      date: "Dec 18, 2024",
      time: "6:00 PM",
      attendees: 28,
      type: "Cultural",
    },
  ]

  container.innerHTML = events.map((event) => createEventCard(event)).join("")
}

// Card Creation Functions
function createPostCard(post) {
  return `
        <div class="feed-card post-card">
            <div class="card-header">
                <div class="author-info">
                    <div class="author-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div>
                        <h4>${post.author}</h4>
                        <span class="time">${post.time}</span>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
            </div>
            <div class="card-actions">
                <button class="action-btn">
                    <i class="fas fa-heart"></i>
                    <span>${post.likes}</span>
                </button>
                <button class="action-btn">
                    <i class="fas fa-comment"></i>
                    <span>${post.comments}</span>
                </button>
                <button class="action-btn">
                    <i class="fas fa-share"></i>
                </button>
            </div>
        </div>
    `
}

function createCreativeCard(work) {
  return `
        <div class="feed-card creative-card">
            <div class="card-header">
                <div class="author-info">
                    <div class="author-avatar">
                        <i class="fas fa-palette"></i>
                    </div>
                    <div>
                        <h4>${work.author}</h4>
                        <span class="time">${work.time}</span>
                    </div>
                </div>
                <span class="work-type">${work.type}</span>
            </div>
            <div class="card-content">
                <h3>${work.title}</h3>
            </div>
            <div class="card-actions">
                <button class="action-btn">
                    <i class="fas fa-heart"></i>
                    <span>${work.likes}</span>
                </button>
                <button class="action-btn">
                    <i class="fas fa-comment"></i>
                    <span>${work.comments}</span>
                </button>
                <button class="action-btn">
                    <i class="fas fa-share"></i>
                </button>
            </div>
        </div>
    `
}

function createEventCard(event) {
  return `
        <div class="feed-card event-card">
            <div class="card-header">
                <span class="event-type">${event.type}</span>
            </div>
            <div class="card-content">
                <h3>${event.title}</h3>
                <p class="organizer">by ${event.organizer}</p>
                <div class="event-details">
                    <div class="detail">
                        <i class="fas fa-calendar"></i>
                        <span>${event.date}</span>
                    </div>
                    <div class="detail">
                        <i class="fas fa-clock"></i>
                        <span>${event.time}</span>
                    </div>
                    <div class="detail">
                        <i class="fas fa-users"></i>
                        <span>${event.attendees} attending</span>
                    </div>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn btn-primary btn-small">RSVP</button>
                <button class="action-btn">
                    <i class="fas fa-share"></i>
                </button>
            </div>
        </div>
    `
}

// Chatbot Functionality
function toggleChatbot() {
  chatbotWindow.classList.toggle("active")
}

function closeChatbot() {
  chatbotWindow.classList.remove("active")
}

function sendChatMessage() {
  const message = chatbotInput.value.trim()
  if (message) {
    addChatMessage(message, "user")
    chatbotInput.value = ""

    // Simulate bot response
    setTimeout(() => {
      const response = getBotResponse(message)
      addChatMessage(response, "bot")
    }, 1000)
  }
}

function addChatMessage(message, sender) {
  const messageDiv = document.createElement("div")
  messageDiv.className = `${sender}-message`
  messageDiv.textContent = message
  chatbotMessages.appendChild(messageDiv)
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight
}

function getBotResponse(message) {
  const lowerMessage = message.toLowerCase()

  // Enhanced responses with more comprehensive help
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("namaste")) {
    return "Namaste! Welcome to BhetGhat - Your Digital Chautari! I'm here to help you navigate our community platform. How can I assist you today?"
  }

  if (lowerMessage.includes("event") || lowerMessage.includes("workshop") || lowerMessage.includes("seminar")) {
    return 'To create events, go to the Events page and click "Create Event". You can add workshops, seminars, cultural events, and more. Need help with event management? Type "event help" for detailed guidance.'
  }

  if (
    lowerMessage.includes("creative") ||
    lowerMessage.includes("art") ||
    lowerMessage.includes("poetry") ||
    lowerMessage.includes("music")
  ) {
    return "Visit our Creative Corner to share your poems, stories, artwork, music, and photography! Click the upload button to share your creative works with the community. Type 'creative help' for upload guidelines."
  }

  if (lowerMessage.includes("community") || lowerMessage.includes("discussion") || lowerMessage.includes("forum")) {
    return "Join discussions in our Community Hub! Share your thoughts on hobbies, travel, technology, and local issues. Create posts, participate in polls, and connect with like-minded people."
  }

  if (lowerMessage.includes("profile") || lowerMessage.includes("account") || lowerMessage.includes("settings")) {
    return "Manage your profile by clicking on your avatar in the top right. You can edit personal info, adjust privacy settings, change themes, and manage notifications. Need account help? Type 'account help'."
  }

  if (lowerMessage.includes("language") || lowerMessage.includes("nepali") || lowerMessage.includes("english")) {
    return "BhetGhat supports both English and Nepali! Toggle between languages using the EN/NP button in the top navigation. All content adapts to your preferred language."
  }

  if (lowerMessage.includes("dark mode") || lowerMessage.includes("theme")) {
    return "Switch between light and dark themes using the moon/sun icon in the navigation. Your preference is saved automatically. You can also change themes in Settings."
  }

  if (lowerMessage.includes("help") || lowerMessage.includes("support") || lowerMessage.includes("problem")) {
    return "I'm here to help! For detailed assistance, visit our Help Center, check the FAQ, or create a support ticket. Type 'support ticket' to report an issue or get personalized help."
  }

  if (lowerMessage.includes("support ticket") || lowerMessage.includes("ticket") || lowerMessage.includes("report")) {
    return "I'll help you create a support ticket. Please describe your issue and I'll connect you with our support team. Would you like to create a ticket now? Type 'yes' to proceed."
  }

  if (lowerMessage.includes("yes") && chatbotMessages.lastElementChild.textContent.includes("create a ticket")) {
    setTimeout(() => {
      window.open("support.html", "_blank")
    }, 1000)
    return "Opening the support ticket form for you. Please provide detailed information about your issue so we can assist you better."
  }

  if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("phone")) {
    return "You can reach us through multiple channels: Email: support@bhetghat.com, Phone: +977-1-4567890, or use our contact form in the Help Center. We typically respond within 24 hours."
  }

  if (lowerMessage.includes("feature") || lowerMessage.includes("suggestion") || lowerMessage.includes("feedback")) {
    return "We love hearing your ideas! Share feature suggestions and feedback through our support form or community discussions. Your input helps make BhetGhat better for everyone."
  }

  if (lowerMessage.includes("technical") || lowerMessage.includes("bug") || lowerMessage.includes("error")) {
    return "For technical issues, please create a support ticket with details about the problem, your device/browser, and steps to reproduce the issue. Our tech team will investigate promptly."
  }

  // Default response with helpful options
  return "Thank you for reaching out! I can help you with: Events & Workshops, Creative Corner, Community Discussions, Account Settings, Technical Support, or General Questions. What would you like to know more about?"
}

// Event Listeners Setup
function setupEventListeners() {
  // Theme toggle
  themeToggle.addEventListener("click", toggleTheme)

  // Language toggle
  langToggle.addEventListener("click", toggleLanguage)

  // Mobile menu
  mobileMenuBtn.addEventListener("click", toggleMobileMenu)

  // Search functionality
  searchBtn.addEventListener("click", performSearch)
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch()
    }
  })

  // Filter buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      setActiveFilter(this)
    })
  })

  // Chatbot
  chatbotToggle.addEventListener("click", toggleChatbot)
  chatbotClose.addEventListener("click", closeChatbot)
  chatbotSend.addEventListener("click", sendChatMessage)
  chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendChatMessage()
    }
  })

  // Close mobile menu when clicking nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Additional CSS for feed cards
const additionalStyles = `
.feed-card {
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.3s ease;
}

.feed-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px var(--shadow-color);
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.author-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.author-avatar {
    width: 40px;
    height: 40px;
    background-color: var(--primary-green);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.author-info h4 {
    margin: 0;
    font-weight: 600;
    color: var(--text-primary);
}

.time {
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.work-type, .event-type {
    background-color: var(--secondary-orange);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
}

.card-content h3 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
    font-weight: 600;
}

.card-content p {
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.5;
}

.organizer {
    color: var(--primary-green);
    font-weight: 500;
    margin-bottom: 1rem !important;
}

.event-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.detail {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.detail i {
    color: var(--primary-green);
    width: 16px;
}

.card-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
}

.action-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    transition: color 0.3s ease;
}

.action-btn:hover {
    color: var(--primary-green);
}

.btn-small {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
}

.user-message {
    background-color: var(--primary-green);
    color: white;
    padding: 0.75rem;
    border-radius: 12px;
    margin-bottom: 1rem;
    margin-left: 2rem;
    text-align: right;
}
`

// Add additional styles to the page
const styleSheet = document.createElement("style")
styleSheet.textContent = additionalStyles
document.head.appendChild(styleSheet)
