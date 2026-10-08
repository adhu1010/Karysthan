/**
 * കാര്യസ്ഥൻ (Karyasthan) - Ad Landing Interactive Logic
 * Hosted for adhwaith.me -> Redirecting to https://karysthan.vercel.app
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

  let selectedCategory = 'Plumbing';

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
    if (mainLaunchBtn) {
      mainLaunchBtn.href = `${APP_URL}#waitlist?cat=${encodeURIComponent(category)}`;
    }
  }

  // Set initial links
  updateCtaLinks(selectedCategory);

  // Live Activity Feed Ticker for Kochi Neighborhoods
  const liveActivities = [
    'കാക്കനാട് ഇൻഫോപാർക്കിൽ നിന്നും രാജേഷ് പ്ലംബർ ബുക്ക് ചെയ്തു (2 മിനിറ്റ് മുൻപ്)',
    'ഇടപ്പള്ളി ടോൾ ജംഗ്ഷനിൽ നിന്നും ഫാത്തിമ ഇലക്ട്രീഷ്യനെ ബുക്ക് ചെയ്തു (4 മിനിറ്റ് മുൻപ്)',
    'വൈറ്റില ഹബ്ബിൽ നിന്നും മനോജ് കാർപെന്റർ റിപ്പയർ ആവശ്യപ്പെട്ടു (Just now)',
    'ആലുവ ബൈപ്പാസിൽ നിന്നും 30 മിനിറ്റ് എമർജൻസി പ്ലംബിംഗ് ബുക്കിംഗ് ലഭിച്ചു (1 മിനിറ്റ് മുൻപ്)',
    'പാലാരിവട്ടത്ത് നിന്നും വാട്ടർ ടാപ്പ് ഫിറ്റിംഗിനായി ടെക്നീഷ്യൻ എത്തി (3 മിനിറ്റ് മുൻപ്)',
    'ഫോർട്ട് കൊച്ചിയിൽ നിന്നും ആൻറണി ചേട്ടൻ രജിസ്റ്റർ ചെയ്തു (5 മിനിറ്റ് മുൻപ്)'
  ];

  let currentActivityIndex = 0;

  if (tickerContent) {
    setInterval(() => {
      currentActivityIndex = (currentActivityIndex + 1) % liveActivities.length;
      tickerContent.style.opacity = '0';
      tickerContent.style.transform = 'translateY(5px)';
      
      setTimeout(() => {
        tickerContent.textContent = liveActivities[currentActivityIndex];
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
      // Allow default navigation to karysthan.vercel.app
      // Add subtle visual press feedback
      link.style.transform = 'scale(0.97)';
      setTimeout(() => {
        link.style.transform = '';
      }, 150);
    });
  });

  // Optional: Check if auto-redirect query param is set (?redirect=true or ?auto=true)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('auto') === 'true' || urlParams.get('redirect') === 'true') {
    const delay = parseInt(urlParams.get('delay') || '3', 10) * 1000;
    setTimeout(() => {
      window.location.href = APP_URL;
    }, delay);
  }
});
