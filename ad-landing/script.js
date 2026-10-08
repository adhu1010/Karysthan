/**
 * കാര്യസ്ഥൻ (Karyasthan) - Ad Landing Interactive Logic
 * Hosted for adhwaith.me -> Redirecting to https://karysthan.vercel.app
 * Bilingual Support: English (Default) & Malayalam with Dynamic Language Toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  const APP_URL = 'https://karysthan.vercel.app';
  
  // Elements
  const chips = document.querySelectorAll('.chip');
  const mainLaunchBtn = document.getElementById('mainLaunchBtn');
  const navCtaBtn = document.getElementById('navCtaBtn');
  const topNavDirectLink = document.getElementById('topNavDirectLink');
  const cardActionLink = document.getElementById('cardActionLink');
  const bottomCtaBtn = document.getElementById('bottomCtaBtn');
  const techJoinBtn = document.getElementById('techJoinBtn');
  const tickerContent = document.getElementById('tickerContent');
  const langButtons = document.querySelectorAll('.lang-btn');

  let selectedCategory = 'Plumbing';
  let currentLanguage = 'en'; // Default to English as requested

  // Activity Feeds in English & Malayalam
  const activities = {
    en: [
      'Rajesh booked a plumber from Kakkanad Infopark (2 mins ago)',
      'Fatima booked an electrician from Edappally Toll (4 mins ago)',
      'Manoj requested carpentry repair from Vyttila Hub (Just now)',
      'Emergency 30-min plumbing visit dispatched to Aluva (1 min ago)',
      'Technician arrived for water tap fitting in Palarivattom (3 mins ago)',
      'Antony registered as certified craftsman from Fort Kochi (5 mins ago)'
    ],
    ml: [
      'കാക്കനാട് ഇൻഫോപാർക്കിൽ നിന്നും രാജേഷ് പ്ലംബർ ബുക്ക് ചെയ്തു (2 മിനിറ്റ് മുൻപ്)',
      'ഇടപ്പള്ളി ടോൾ ജംഗ്ഷനിൽ നിന്നും ഫാത്തിമ ഇലക്ട്രീഷ്യനെ ബുക്ക് ചെയ്തു (4 മിനിറ്റ് മുൻപ്)',
      'വൈറ്റില ഹബ്ബിൽ നിന്നും മനോജ് കാർപെന്റർ റിപ്പയർ ആവശ്യപ്പെട്ടു (Just now)',
      'ആലുവ ബൈപ്പാസിൽ നിന്നും 30 മിനിറ്റ് എമർജൻസി പ്ലംബിംഗ് ബുക്കിംഗ് ലഭിച്ചു (1 മിനിറ്റ് മുൻപ്)',
      'പാലാരിവട്ടത്ത് നിന്നും വാട്ടർ ടാപ്പ് ഫിറ്റിംഗിനായി ടെക്നീഷ്യൻ എത്തി (3 മിനിറ്റ് മുൻപ്)',
      'ഫോർട്ട് കൊച്ചിയിൽ നിന്നും ആൻറണി ചേട്ടൻ രജിസ്റ്റർ ചെയ്തു (5 മിനിറ്റ് മുൻപ്)'
    ]
  };

  let currentActivityIndex = 0;

  // Language Switch Function
  function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('karyasthan_ad_lang', lang);
    document.documentElement.lang = lang;

    // Update active state of language buttons
    langButtons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update all elements with data-en and data-ml attributes
    const translatableElements = document.querySelectorAll('[data-en][data-ml]');
    translatableElements.forEach(el => {
      const translation = el.getAttribute(`data-${lang}`);
      if (translation) {
        el.innerHTML = translation;
      }
    });

    // Update links with language query param
    updateCtaLinks(selectedCategory);

    // Update live ticker immediately
    if (tickerContent) {
      tickerContent.textContent = activities[lang][currentActivityIndex];
    }
  }

  // Bind Language buttons
  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang) {
        setLanguage(targetLang);
      }
    });
  });

  // Detect URL parameter (?lang=en or ?lang=ml) or localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const paramLang = urlParams.get('lang');
  const storedLang = localStorage.getItem('karyasthan_ad_lang');

  if (paramLang === 'en' || paramLang === 'ml') {
    setLanguage(paramLang);
  } else if (storedLang === 'en' || storedLang === 'ml') {
    setLanguage(storedLang);
  } else {
    // Default to English as requested
    setLanguage('en');
  }

  // Category Selection & Dynamic Deep Link building
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      
      selectedCategory = chip.getAttribute('data-category') || 'Plumbing';
      updateCtaLinks(selectedCategory);
    });
  });

  function updateCtaLinks(category) {
    const langParam = `lang=${currentLanguage}`;
    if (mainLaunchBtn) {
      mainLaunchBtn.href = `${APP_URL}?${langParam}#waitlist?cat=${encodeURIComponent(category)}`;
    }
    if (navCtaBtn) {
      navCtaBtn.href = `${APP_URL}?${langParam}`;
    }
    if (topNavDirectLink) {
      topNavDirectLink.href = `${APP_URL}?${langParam}`;
    }
    if (cardActionLink) {
      cardActionLink.href = `${APP_URL}?${langParam}`;
    }
    if (bottomCtaBtn) {
      bottomCtaBtn.href = `${APP_URL}?${langParam}#waitlist`;
    }
    if (techJoinBtn) {
      techJoinBtn.href = `${APP_URL}?${langParam}#waitlist`;
    }
  }

  // Live Activity Feed Ticker
  if (tickerContent) {
    setInterval(() => {
      const activeList = activities[currentLanguage] || activities.en;
      currentActivityIndex = (currentActivityIndex + 1) % activeList.length;
      tickerContent.style.opacity = '0';
      tickerContent.style.transform = 'translateY(5px)';
      
      setTimeout(() => {
        tickerContent.textContent = activeList[currentActivityIndex];
        tickerContent.style.opacity = '1';
        tickerContent.style.transform = 'translateY(0)';
      }, 250);
    }, 4500);
  }

  // Smooth click interaction & transition
  const redirectLinks = [
    mainLaunchBtn, 
    navCtaBtn, 
    topNavDirectLink, 
    cardActionLink, 
    bottomCtaBtn, 
    techJoinBtn
  ];

  redirectLinks.forEach((link) => {
    if (!link) return;
    link.addEventListener('click', (e) => {
      link.style.transform = 'scale(0.97)';
      setTimeout(() => {
        link.style.transform = '';
      }, 150);
    });
  });

  // Optional: Check if auto-redirect query param is set (?redirect=true or ?auto=true)
  if (urlParams.get('auto') === 'true' || urlParams.get('redirect') === 'true') {
    const delay = parseInt(urlParams.get('delay') || '3', 10) * 1000;
    setTimeout(() => {
      window.location.href = `${APP_URL}?lang=${currentLanguage}`;
    }, delay);
  }
});
