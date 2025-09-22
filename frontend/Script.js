// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

    // Check if elements exist
    if (!container || !registerBtn || !loginBtn) {
        console.error('Required elements not found!');
        return;
    }

    // Toggle between login and register forms
    registerBtn.addEventListener('click', function() {
        console.log('Register button clicked');
    container.classList.add('active');
        // Show toast notification
        if (window.toast) {
            toast.info('Switching to registration form...');
        }
    });

    loginBtn.addEventListener('click', function() {
        console.log('Login button clicked');
        container.classList.remove('active');
        // Show toast notification
        if (window.toast) {
            toast.info('Switching to login form...');
        }
    });

    // User storage system
    function getStoredUsers() {
        const users = localStorage.getItem('neotixUsers');
        return users ? JSON.parse(users) : {};
    }

    function storeUser(username, email, password) {
        const users = getStoredUsers();
        users[username] = {
            email: email,
            password: password,
            registeredAt: new Date().toISOString()
        };
        localStorage.setItem('neotixUsers', JSON.stringify(users));
    }

    function getUser(username) {
        const users = getStoredUsers();
        return users[username] || null;
    }

    function validateUserCredentials(username, password) {
        const user = getUser(username);
        if (!user) {
            return { valid: false, error: 'Username not found. Please register first.' };
        }
        if (user.password !== password) {
            return { valid: false, error: 'Password does not match. Please check your password.' };
        }
        return { valid: true, user: user };
    }

    // Form validation functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    function validateUsername(username) {
        // Username should be 3-20 characters, only letters and underscores
        const usernameRegex = /^[a-zA-Z_]{3,20}$/;
        return usernameRegex.test(username);
    }

    function getUsernameError(username) {
        if (username.length < 3) {
            return 'Username must be at least 3 characters long';
        }
        if (username.length > 20) {
            return 'Username must be less than 20 characters';
        }
        if (!/^[a-zA-Z_]/.test(username)) {
            return 'Username must start with a letter or underscore';
        }
        if (!/^[a-zA-Z_]+$/.test(username)) {
            return 'Username can only contain letters and underscores (no numbers or special characters)';
        }
        return null;
    }

    function getPasswordError(password) {
        if (password.length < 6) {
            return 'Password must be at least 6 characters long';
        }
        if (password.length > 50) {
            return 'Password must be less than 50 characters';
        }
        return null;
    }

    function getEmailError(email) {
        if (!email.includes('@')) {
            return 'Email must contain @ symbol';
        }
        if (!email.includes('.')) {
            return 'Email must contain a domain (e.g., .com)';
        }
        if (email.startsWith('@') || email.endsWith('@')) {
            return 'Email cannot start or end with @ symbol';
        }
        if (email.includes('..')) {
            return 'Email cannot contain consecutive dots';
        }
        if (!validateEmail(email)) {
            return 'Please enter a valid email address (e.g., user@example.com)';
        }
        return null;
    }

    // Login form validation
    const loginForm = document.querySelector('.login form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = loginForm.querySelector('input[type="text"]').value.trim();
            const password = loginForm.querySelector('input[type="password"]').value.trim();
            
            // Validation
            if (!username) {
                if (window.toast) {
                    toast.error('Please enter your username');
                }
                return;
            }
            
            if (!password) {
                if (window.toast) {
                    toast.error('Please enter your password');
                }
                return;
            }
            
            // Check username validation
            const usernameError = getUsernameError(username);
            if (usernameError) {
                if (window.toast) {
                    toast.error(usernameError);
                }
                return;
            }
            
            // Check password validation
            const passwordError = getPasswordError(password);
            if (passwordError) {
                if (window.toast) {
                    toast.error(passwordError);
                }
                return;
            }
            
            // Check if user exists and password matches
            const credentialCheck = validateUserCredentials(username, password);
            if (!credentialCheck.valid) {
                if (window.toast) {
                    toast.error(credentialCheck.error);
                }
                return;
            }
            
            // Simulate login process
            if (window.toast) {
                toast.info('Logging in...', 1000);
            }
            
            setTimeout(() => {
                if (window.toast) {
                    toast.success(`Login successful! Welcome back, ${username}!`);
                }
                // Here you would typically redirect or handle the successful login
                console.log('Login successful:', { username, user: credentialCheck.user });
                
                // Show quiz after successful login
                setTimeout(() => {
                    showQuiz();
                }, 2000);
            }, 1500);
        });
    }

    // Register form validation
    const registerForm = document.querySelector('.register form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = registerForm.querySelector('input[type="text"]').value.trim();
            const email = registerForm.querySelector('input[type="email"]').value.trim();
            const password = registerForm.querySelector('input[type="password"]').value.trim();
            
            // Validation
            if (!username) {
                if (window.toast) {
                    toast.error('Please enter a username');
                }
                return;
            }
            
            if (!email) {
                if (window.toast) {
                    toast.error('Please enter your email');
                }
                return;
            }
            
            if (!password) {
                if (window.toast) {
                    toast.error('Please enter a password');
                }
                return;
            }
            
            // Check username validation
            const usernameError = getUsernameError(username);
            if (usernameError) {
                if (window.toast) {
                    toast.error(usernameError);
                }
                return;
            }
            
            // Check email validation
            const emailError = getEmailError(email);
            if (emailError) {
                if (window.toast) {
                    toast.error(emailError);
                }
                return;
            }
            
            // Check password validation
            const passwordError = getPasswordError(password);
            if (passwordError) {
                if (window.toast) {
                    toast.error(passwordError);
                }
                return;
            }
            
            // Check if username already exists
            const existingUser = getUser(username);
            if (existingUser) {
                if (window.toast) {
                    toast.error('Username already exists. Please choose a different username.');
                }
                return;
            }
            
            // Simulate registration process
            if (window.toast) {
                toast.info('Creating your account...', 1000);
            }
            
            setTimeout(() => {
                // Store user data
                storeUser(username, email, password);
                
                if (window.toast) {
                    toast.success(`Registration successful! Welcome to Neotix, ${username}!`);
                }
                // Switch to login form after successful registration
                container.classList.remove('active');
                // Clear the form
                registerForm.reset();
                // Here you would typically handle the successful registration
                console.log('Registration successful:', { username, email, password });
            }, 1500);
        });
    }

    // Add input validation on blur for better UX
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const value = input.value.trim();
            const type = input.type;
            
            if (value && window.toast) {
                if (type === 'email') {
                    const emailError = getEmailError(value);
                    if (emailError) {
                        toast.warning(emailError);
                    }
                } else if (type === 'password') {
                    const passwordError = getPasswordError(value);
                    if (passwordError) {
                        toast.warning(passwordError);
                    }
                } else if (type === 'text') {
                    const usernameError = getUsernameError(value);
                    if (usernameError) {
                        toast.warning(usernameError);
                    }
                }
            }
        });
    });

    // Social login functionality
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.getAttribute('data-provider');
            handleSocialLogin(provider);
        });
    });

    function handleSocialLogin(provider) {
        if (!window.toast) {
            console.error('Toast system not available');
            return;
        }

        // Show loading message
        toast.info(`Connecting to ${provider.charAt(0).toUpperCase() + provider.slice(1)}...`, 1000);

        // Real OAuth implementation
        setTimeout(() => {
            switch(provider) {
                case 'google':
                    initiateGoogleLogin();
                    break;
                case 'github':
                    initiateGitHubLogin();
                    break;
                default:
                    toast.error('Unknown login provider');
            }
        }, 1000);
    }

    function initiateGoogleLogin() {
        // Check if we have a valid Google Client ID
        const clientId = 'YOUR_GOOGLE_CLIENT_ID';
        
        if (clientId === 'YOUR_GOOGLE_CLIENT_ID') {
            // Demo mode - simulate Google login without real OAuth
            toast.info('Starting Google login simulation...', 1000);
            
            setTimeout(() => {
                showGoogleDemoPopup();
            }, 1500);
        } else {
            // Real OAuth mode
            const redirectUri = window.location.origin + '/auth/google/callback';
            const scope = 'openid email profile';
            
            const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
                `client_id=${clientId}&` +
                `redirect_uri=${encodeURIComponent(redirectUri)}&` +
                `scope=${encodeURIComponent(scope)}&` +
                `response_type=code&` +
                `access_type=offline&` +
                `prompt=consent`;
            
            toast.info('Redirecting to Google...', 1000);
            
            setTimeout(() => {
                showGoogleAuthPopup(googleAuthUrl);
            }, 1500);
        }
    }

    function initiateGitHubLogin() {
        // Check if we have a valid GitHub Client ID
        const clientId = 'YOUR_GITHUB_CLIENT_ID';
        
        if (clientId === 'YOUR_GITHUB_CLIENT_ID') {
            // Demo mode - simulate GitHub login without real OAuth
            toast.info('Starting GitHub login simulation...', 1000);
            
            setTimeout(() => {
                showGitHubDemoPopup();
            }, 1500);
        } else {
            // Real OAuth mode
            const redirectUri = window.location.origin + '/auth/github/callback';
            const scope = 'user:email';
            
            const githubAuthUrl = `https://github.com/login/oauth/authorize?` +
                `client_id=${clientId}&` +
                `redirect_uri=${encodeURIComponent(redirectUri)}&` +
                `scope=${encodeURIComponent(scope)}&` +
                `response_type=code`;
            
            toast.info('Redirecting to GitHub...', 1000);
            
            setTimeout(() => {
                showGitHubAuthPopup(githubAuthUrl);
            }, 1500);
        }
    }

    function showGoogleDemoPopup() {
        // Create a demo popup with Google-like interface
        const demoHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Google Sign In - Demo</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; background: #fff; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .google-logo { font-size: 24px; color: #4285f4; font-weight: bold; }
                    .form { max-width: 300px; margin: 0 auto; }
                    .input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; }
                    .btn { width: 100%; padding: 12px; background: #4285f4; color: white; border: none; border-radius: 4px; cursor: pointer; }
                    .btn:hover { background: #3367d6; }
                    .demo-note { background: #e8f0fe; padding: 10px; border-radius: 4px; margin: 20px 0; font-size: 12px; color: #1a73e8; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="google-logo">Google</div>
                    <h2>Sign in to your account</h2>
                </div>
                <div class="form">
                    <input type="email" class="input" placeholder="Email or phone" value="demo@example.com" readonly>
                    <input type="password" class="input" placeholder="Password" value="••••••••" readonly>
                    <button class="btn" onclick="window.close()">Sign In (Demo)</button>
                </div>
                <div class="demo-note">
                    <strong>Demo Mode:</strong> This is a simulation. In production, this would connect to real Google OAuth.
                </div>
            </body>
            </html>
        `;
        
        const popup = window.open('', 'googleDemo', 'width=400,height=500,scrollbars=yes,resizable=yes');
        popup.document.write(demoHtml);
        
        // Monitor popup for completion
        const checkClosed = setInterval(() => {
            if (popup.closed) {
                clearInterval(checkClosed);
                toast.success('Google login successful! Welcome!');
                console.log('Google demo completed');
            }
        }, 1000);
        
        // Auto-close popup after 30 seconds if not closed
        setTimeout(() => {
            if (!popup.closed) {
                popup.close();
                toast.warning('Google login timed out. Please try again.');
            }
        }, 30000);
    }

    function showGoogleAuthPopup(authUrl) {
        // Create popup window for Google OAuth
        const popup = window.open(
            authUrl,
            'googleAuth',
            'width=500,height=600,scrollbars=yes,resizable=yes'
        );
        
        // Monitor popup for completion
        const checkClosed = setInterval(() => {
            if (popup.closed) {
                clearInterval(checkClosed);
                // Simulate successful login for demo
                toast.success('Google login successful! Welcome!');
                console.log('Google OAuth completed');
            }
        }, 1000);
        
        // Auto-close popup after 30 seconds if not closed
        setTimeout(() => {
            if (!popup.closed) {
                popup.close();
                toast.warning('Google login timed out. Please try again.');
            }
        }, 30000);
    }

    function showGitHubDemoPopup() {
        // Create a demo popup with GitHub-like interface
        const demoHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>GitHub Sign In - Demo</title>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 20px; background: #f6f8fa; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .github-logo { font-size: 24px; color: #24292e; font-weight: bold; }
                    .form { max-width: 300px; margin: 0 auto; background: white; padding: 20px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
                    .input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #d1d5da; border-radius: 6px; }
                    .btn { width: 100%; padding: 12px; background: #2ea44f; color: white; border: none; border-radius: 6px; cursor: pointer; }
                    .btn:hover { background: #2c974b; }
                    .demo-note { background: #dbeafe; padding: 10px; border-radius: 6px; margin: 20px 0; font-size: 12px; color: #1e40af; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="github-logo">GitHub</div>
                    <h2>Sign in to your account</h2>
                </div>
                <div class="form">
                    <input type="text" class="input" placeholder="Username or email" value="demo-user" readonly>
                    <input type="password" class="input" placeholder="Password" value="••••••••" readonly>
                    <button class="btn" onclick="window.close()">Sign In (Demo)</button>
                </div>
                <div class="demo-note">
                    <strong>Demo Mode:</strong> This is a simulation. In production, this would connect to real GitHub OAuth.
                </div>
            </body>
            </html>
        `;
        
        const popup = window.open('', 'githubDemo', 'width=400,height=500,scrollbars=yes,resizable=yes');
        popup.document.write(demoHtml);
        
        // Monitor popup for completion
        const checkClosed = setInterval(() => {
            if (popup.closed) {
                clearInterval(checkClosed);
                toast.success('GitHub login successful! Welcome!');
                console.log('GitHub demo completed');
            }
        }, 1000);
        
        // Auto-close popup after 30 seconds if not closed
        setTimeout(() => {
            if (!popup.closed) {
                popup.close();
                toast.warning('GitHub login timed out. Please try again.');
            }
        }, 30000);
    }

    function showGitHubAuthPopup(authUrl) {
        // Create popup window for GitHub OAuth
        const popup = window.open(
            authUrl,
            'githubAuth',
            'width=500,height=600,scrollbars=yes,resizable=yes'
        );
        
        // Monitor popup for completion
        const checkClosed = setInterval(() => {
            if (popup.closed) {
                clearInterval(checkClosed);
                // Simulate successful login for demo
                toast.success('GitHub login successful! Welcome!');
                console.log('GitHub OAuth completed');
            }
        }, 1000);
        
        // Auto-close popup after 30 seconds if not closed
        setTimeout(() => {
            if (!popup.closed) {
                popup.close();
                toast.warning('GitHub login timed out. Please try again.');
            }
        }, 30000);
    }

    // Career Quiz System - Optimized
    const quizQuestions = [
        { text: "1️⃣ Which area excites you the most?", options: ["Software & Programming", "Electronics", "Mechanical", "Civil", "Emerging Tech", "Business"] },
        { text: "2️⃣ What type of problems do you enjoy solving?", options: ["Building applications", "Optimizing circuits", "Designing machines", "Planning infrastructure", "Research & data", "Managing teams"] },
        { text: "3️⃣ Which career path do you prefer?", options: ["Higher Studies", "Core Engineering", "IT / Software", "Government / PSU", "Start-up"] },
        { text: "4️⃣ Which subject/skill do you feel most confident in?", options: ["Programming", "Math & Logic", "Electronics", "Mechanical Design", "Civil Knowledge", "Still Exploring"] },
        { text: "5️⃣ Which trend interests you most?", options: ["AI / Data Science", "IoT / Robotics", "Cloud / Cybersecurity", "Renewable Energy", "Smart Cities", "Electric Vehicles"] },
        { text: "6️⃣ What kind of work environment would you prefer?", options: ["Office-based", "Lab / R&D", "Field / On-site", "Start-up", "Government"] },
        { text: "7️⃣ How do you prefer learning new things?", options: ["Hands-on", "Online courses", "Reading", "Team-based", "Classroom"] },
        { text: "8️⃣ Which role suits your personality the best?", options: ["Innovator", "Builder", "Analyst", "Leader"] },
        { text: "9️⃣ How much extra time can you spend learning?", options: ["Less than 5 hrs", "5–10 hrs", "10–15 hrs", "More than 15 hrs"] },
        { text: "🔟 Where do you see yourself in future?", options: ["Corporate job", "Research / Abroad", "Start-up", "Core engineering", "Still undecided"] }
    ];

    let currentQuestion = 0;
    const quizAnswers = [];
    
    // Cache DOM elements for better performance
    let quizElements = {
        container: null,
        quizSection: null,
        quizArea: null,
        nextBtn: null
    };
    
    // Initialize DOM element cache
    function initQuizElements() {
        quizElements.container = document.querySelector('.container');
        quizElements.quizSection = document.getElementById('quizSection');
        quizElements.quizArea = document.getElementById('quizArea');
        quizElements.nextBtn = document.getElementById('nextBtn');
        
        console.log('Initializing quiz elements...');
        console.log('Found elements:', {
            container: !!quizElements.container,
            quizSection: !!quizElements.quizSection,
            quizArea: !!quizElements.quizArea,
            nextBtn: !!quizElements.nextBtn
        });
    }
    
    // Re-initialize quiz elements when showing quiz
    function reinitQuizElements() {
        quizElements.quizArea = document.getElementById('quizArea');
        quizElements.nextBtn = document.getElementById('nextBtn');
        console.log('Re-initialized quiz elements for quiz display');
    }

    // Quiz functions - Optimized
    function showQuiz() {
        console.log('Showing quiz...');
        reinitQuizElements();

        if (quizElements.container) {
            quizElements.quizSection.classList.add('active');
        }

        if (quizElements.quizSection) {
            quizElements.quizSection.style.display = 'block'; // ✅ simpler

            if (quizElements.nextBtn && !quizElements.nextBtn.hasAttribute('data-listener-added')) {
                quizElements.nextBtn.addEventListener('click', nextQuestion);
                quizElements.nextBtn.setAttribute('data-listener-added', 'true');
            }

            startQuiz(); // ✅ will display first question immediately
        } else {
            console.error('Quiz section not found!');
        }
    }


    function hideQuiz() {
        console.log('Hiding quiz...');
        
        if (quizElements.quizSection) {
            quizElements.quizSection.classList.remove('active');
        }
        
        if (quizElements.container) {
            quizElements.quizSection.classList.add('active');
        }
        
        resetQuiz();
    }

    function startQuiz() {
        console.log('Starting quiz...');
        currentQuestion = 0;
        quizAnswers.length = 0;
        
        // Add a test message to verify quiz is working
        if (quizElements.quizArea) {
            quizElements.quizArea.innerHTML = '<div class="question-card" style="background: #e8f5e8; border-left: 6px solid #28a745;"><h3>🎯 Quiz Loading...</h3><p>Please wait while we prepare your career assessment...</p></div>';
        }
        displayQuestion();
        // Small delay to ensure DOM is ready
        // setTimeout(() => {
        //     displayQuestion();
        // }, 100);
    }

    function resetQuiz() {
        currentQuestion = 0;
        quizAnswers.length = 0;
        
        if (quizElements.quizArea) {
            quizElements.quizArea.innerHTML = '';
        }
        
        if (quizElements.nextBtn) {
            quizElements.nextBtn.innerText = 'Next ➡';
            quizElements.nextBtn.style.display = 'block';
        }
    }

    function displayQuestion() {
        console.log('Displaying question:', currentQuestion);
        
        if (!quizElements.quizArea) {
            console.error('Quiz area not found!');
            return;
        }
        
        quizElements.quizArea.innerHTML = '';

        // Show previous answers
        for (let i = 0; i < quizAnswers.length; i++) {
            const prevCard = document.createElement('div');
            prevCard.className = 'question-card';
            prevCard.innerHTML = `
                <label>${quizQuestions[i].text}</label>
                <p><strong>${quizAnswers[i]}</strong></p>
            `;
            quizElements.quizArea.appendChild(prevCard);
        }

        // Show current question
        if (currentQuestion < quizQuestions.length) {
            const card = document.createElement('div');
            card.className = 'question-card';

            const label = document.createElement('label');
            label.innerText = quizQuestions[currentQuestion].text;
            card.appendChild(label);

            const select = document.createElement('select');
            select.innerHTML = '<option value="">-- Select an option --</option>' +
                quizQuestions[currentQuestion].options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
            card.appendChild(select);

            quizElements.quizArea.appendChild(card);

            if (quizElements.nextBtn && currentQuestion === quizQuestions.length - 1) {
                quizElements.nextBtn.innerText = ' Submit Quiz';
            }
        } else {
            showResults();
        }
    }

    const paceMultipliers = {
  "Less than 5 hrs": 2.0,
  "5–10 hrs": 1.5,
  "10–15 hrs": 1.0,
  "More than 15 hrs": 0.75
};

function adjustDuration(minWeeks, maxWeeks, pace) {
  const adjustedMin = Math.ceil(minWeeks * pace);
  const adjustedMax = Math.ceil(maxWeeks * pace);
  return adjustedMin === adjustedMax
    ? `${adjustedMin} weeks`
    : `${adjustedMin}-${adjustedMax} weeks`;
}


    function showResults() {
        if (quizElements.nextBtn) {
            quizElements.nextBtn.style.display = 'none';
        }

        const domainScores = {
            CSE: 0, ECE: 0, EEE: 0, Mech: 0, Civil: 0,
            Emerging: 0, Business: 0, Core: 0, Govt: 0, Exploring: 0
        };

        quizAnswers.forEach(ans => {
            if (ans.includes('Software') || ans.includes('IT') || ans.includes('Cloud') || ans.includes('Analyst')) domainScores.CSE += 2;
            if (ans.includes('Electronics') || ans.includes('Circuits') || ans.includes('IoT')) domainScores.ECE += 2;
            if (ans.includes('Renewable')) domainScores.EEE += 2;
            if (ans.includes('Mechanical') || ans.includes('EV')) domainScores.Mech += 2;
            if (ans.includes('Civil') || ans.includes('Smart Cities')) domainScores.Civil += 2;
            if (ans.includes('Emerging') || ans.includes('AI') || ans.includes('Research') || ans.includes('Innovator')) domainScores.Emerging += 2;
            if (ans.includes('Business') || ans.includes('Leader') || ans.includes('Start-up')) domainScores.Business += 2;
            if (ans.includes('Core') || ans.includes('Field') || ans.includes('Builder') || ans.includes('Hands-on')) domainScores.Core += 2;
            if (ans.includes('Government') || ans.includes('PSU') || ans.includes('Administrative') || ans.includes('Classroom')) domainScores.Govt += 2;
            if (ans.includes('Exploring') || ans.includes('Undecided')) domainScores.Exploring += 2;
        });

        const topDomain = Object.keys(domainScores).reduce((a, b) => domainScores[a] > domainScores[b] ? a : b);

        const domainInfo = {
            CSE: {
                name: 'Computer Science & Engineering',
                focus: 'Programming, AI, Web Dev, Cybersecurity',
                roles: 'Software Developer, Data Analyst, Cloud Engineer'
            },
            ECE: {
                name: 'Electronics & Communication',
                focus: 'Circuits, IoT, Embedded Systems',
                roles: 'IoT Developer, Embedded Engineer, Robotics Specialist'
            },
            EEE: {
                name: 'Electrical & Electronics',
                focus: 'Power Systems, Smart Grids, Energy Tech',
                roles: 'Power Engineer, Grid Analyst, Energy Consultant'
            },
            Mech: {
                name: 'Mechanical Engineering',
                focus: 'Design, CAD, Thermodynamics, EV',
                roles: 'Automotive Engineer, Design Engineer, R&D Specialist'
            },
            Civil: {
                name: 'Civil Engineering',
                focus: 'Structures, Planning, Sustainability',
                roles: 'Site Engineer, Urban Planner, Infrastructure Analyst'
            },
            Emerging: {
                name: 'Emerging Technologies',
                focus: 'AI, ML, Quantum, Green Tech',
                roles: 'AI Researcher, Innovation Consultant, Tech Futurist'
            },
            Business: {
                name: 'Business & Entrepreneurship',
                focus: 'Startups, Strategy, Leadership',
                roles: 'Startup Founder, Product Manager, Tech Consultant'
            },
            Core: {
                name: 'Core Engineering',
                focus: 'Traditional Mech/Civil/EEE fundamentals',
                roles: 'Project Engineer, Plant Supervisor, PSU Officer'
            },
            Govt: {
                name: 'Government / PSU',
                focus: 'GATE, UPSC, Technical Exams',
                roles: 'PSU Engineer, Govt Analyst, Administrative Officer'
            },
            Exploring: {
                name: 'Exploring Options',
                focus: 'Try internships, workshops, and career quizzes',
                roles: 'Generalist, Intern, Career Explorer'
            }
        };

        const result = domainInfo[topDomain];
        // Split roles string into array
        const roles = result.roles.split(",").map(r => r.trim());

        const finalCard = document.createElement('div');
        finalCard.className = 'question-card';
        finalCard.innerHTML = `
            <h3>🎯 Your Ideal Domain: ${result.name}</h3>
            <p><strong>📚 Focus Areas:</strong> ${result.focus}</p>
            <p><strong>💼 Career Roles:</strong> ${result.roles}</p>
            <p>✨ Based on your answers, this domain aligns best with your interests and strengths. Keep exploring and building your future!</p>      
            <p><strong>To generate roadmap for desired role:</strong> ${roles.map(role => `
                <p><button class="btn generateBtn" data-role="${role}">
                📌 Generate Roadmap for ${role}
                </button>
                <p/>
            `).join("")}</p>
            `;
        
        if (quizElements.quizArea) {
            quizElements.quizArea.appendChild(finalCard);
        }

        // Show success toast
        if (window.toast) {
            toast.success(`Quiz completed! Your ideal domain is ${result.name}`);
        }

          // Add click listeners for each button
        document.querySelectorAll(".generateBtn").forEach(btn => {
            btn.addEventListener("click", () => {
            const role = btn.getAttribute("data-role");
            generateRoadmap(role);
            });
        });
    }
 const roadmaps = [
  {
    "role": "Software Developer",
    "title": "Software Developer Roadmap",
    "steps": [
      { "task": "Learn a programming language (C, Java, Python, or JavaScript)", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Understand Data Structures & Algorithms", "minWeeks": 6, "maxWeeks": 8 },
      { "task": "Master Git & GitHub for version control", "minWeeks": 1, "maxWeeks": 2 },
      { "task": "Learn Databases (SQL & NoSQL)", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Practice Problem Solving on LeetCode / HackerRank", "minWeeks": 4, "maxWeeks": 8 },
      { "task": "Build projects (Web apps, APIs, Desktop apps)", "minWeeks": 6, "maxWeeks": 8 },
      { "task": "Explore Frameworks (React, Node.js, Django, Spring)", "minWeeks": 4, "maxWeeks": 6 }
    ],
    "resources": [
      { "name": "Roadmap.sh - Software Developer", "url": "https://roadmap.sh/software-developer" },
      { "name": "freeCodeCamp - Full Stack Development", "url": "https://www.freecodecamp.org" },
      { "name": "LeetCode", "url": "https://leetcode.com" }
    ]
  },
  {
    "role": "Data Analyst",
    "title": "Data Analyst Roadmap",
    "steps": [
      { "task": "Learn Excel / Google Sheets", "minWeeks": 2, "maxWeeks": 3 },
      { "task": "Master SQL for data querying", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Learn a programming language (Python or R)", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Data Visualization (Tableau, Power BI, Matplotlib, Seaborn)", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Statistics & Probability basics", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Practice with real datasets (Kaggle)", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Build dashboards and reports", "minWeeks": 2, "maxWeeks": 3 }
    ],
    "resources": [
      { "name": "Google Data Analytics Professional Certificate", "url": "https://www.coursera.org/professional-certificates/google-data-analytics" },
      { "name": "Kaggle Datasets", "url": "https://www.kaggle.com/datasets" },
      { "name": "SQLBolt - Learn SQL", "url": "https://sqlbolt.com" }
    ]
  },
  {
    "role": "Cloud Engineer",
    "title": "Cloud Engineer Roadmap",
    "steps": [
      { "task": "Learn basics of Networking & Linux", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Understand Cloud concepts (IaaS, PaaS, SaaS)", "minWeeks": 2, "maxWeeks": 2 },
      { "task": "Pick a cloud provider (AWS, Azure, GCP)", "minWeeks": 1, "maxWeeks": 1 },
      { "task": "Get hands-on with Compute, Storage, Databases, Networking", "minWeeks": 6, "maxWeeks": 8 },
      { "task": "Learn Infrastructure as Code (Terraform / CloudFormation)", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Understand DevOps basics (CI/CD, Docker, Kubernetes)", "minWeeks": 6, "maxWeeks": 8 },
      { "task": "Get certified (AWS Solutions Architect / Azure Fundamentals)", "minWeeks": 4, "maxWeeks": 6 }
    ],
    "resources": [
      { "name": "AWS Training & Certification", "url": "https://aws.amazon.com/training/" },
      { "name": "Azure Fundamentals Learning Path", "url": "https://learn.microsoft.com/en-us/training/azure/" },
      { "name": "Google Cloud Skills Boost", "url": "https://cloudskillsboost.google" }
    ]
  },
  {
    "role": "IoT Developer",
    "title": "IoT Developer Roadmap",
    "steps": [
      { "task": "Learn C/C++ or Python for embedded programming", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Understand sensors, actuators, and microcontrollers (Arduino, ESP32)", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Learn IoT protocols (MQTT, CoAP, HTTP)", "minWeeks": 2, "maxWeeks": 3 },
      { "task": "Work with cloud IoT platforms (AWS IoT, Azure IoT Hub)", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Build IoT projects with real hardware", "minWeeks": 6, "maxWeeks": 8 }
    ],
    "resources": [
      { "name": "IoT Roadmap - Roadmap.sh", "url": "https://roadmap.sh/iot" },
      { "name": "Arduino Docs", "url": "https://docs.arduino.cc" }
    ]
  },
  {
    "role": "Embedded Engineer",
    "title": "Embedded Systems Engineer Roadmap",
    "steps": [
      { "task": "Master C programming & basics of microcontrollers", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Learn RTOS (FreeRTOS, Zephyr)", "minWeeks": 3, "maxWeeks": 5 },
      { "task": "Work with assembly and low-level programming", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Practice with ARM Cortex, PIC, or STM32 boards", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Understand hardware/software integration", "minWeeks": 3, "maxWeeks": 4 }
    ],
    "resources": [
      { "name": "FreeRTOS Tutorial", "url": "https://www.freertos.org" },
      { "name": "Embedded.com", "url": "https://www.embedded.com" }
    ]
  },
  {
    "role": "Robotics Specialist",
    "title": "Robotics Specialist Roadmap",
    "steps": [
      { "task": "Learn basic electronics and microcontrollers", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Learn robotics programming (ROS, Python, C++)", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Understand kinematics, sensors, and actuators", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Hands-on with robotics kits / simulation (Gazebo, V-REP)", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Build autonomous robotics projects", "minWeeks": 6, "maxWeeks": 10 }
    ],
    "resources": [
      { "name": "ROS Tutorials", "url": "https://wiki.ros.org" },
      { "name": "Robotics Toolbox MATLAB", "url": "https://petercorke.com/robotics-toolbox-matlab" }
    ]
  },
  {
    "role": "Power Engineer",
    "title": "Power Engineer Roadmap",
    "steps": [
      { "task": "Understand power generation, transmission, and distribution", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Learn about transformers, switchgear, and protection systems", "minWeeks": 3, "maxWeeks": 5 },
      { "task": "Power system analysis with MATLAB/ETAP", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Renewable energy integration", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Practical training in power plants or substations", "minWeeks": 6, "maxWeeks": 8 }
    ],
    "resources": [
      { "name": "Electrical4U Power Systems", "url": "https://www.electrical4u.com" },
      { "name": "ETAP Training", "url": "https://etap.com" }
    ]
  },
  {
    "role": "Grid Analyst",
    "title": "Grid Analyst Roadmap",
    "steps": [
      { "task": "Learn smart grid fundamentals", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Understand load forecasting & demand response", "minWeeks": 3, "maxWeeks": 5 },
      { "task": "Data analysis for grid operations", "minWeeks": 3, "maxWeeks": 5 },
      { "task": "Work with SCADA & grid monitoring systems", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Renewable energy grid integration projects", "minWeeks": 4, "maxWeeks": 6 }
    ],
    "resources": [
      { "name": "Smart Grid Course - NPTEL", "url": "https://nptel.ac.in/courses/108107112" }
    ]
  },
  {
    "role": "Energy Consultant",
    "title": "Energy Consultant Roadmap",
    "steps": [
      { "task": "Understand energy efficiency & audit standards", "minWeeks": 3, "maxWeeks": 5 },
      { "task": "Learn renewable energy tech (solar, wind)", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Energy policy & economics", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Work on case studies of energy optimization", "minWeeks": 4, "maxWeeks": 6 }
    ],
    "resources": [
      { "name": "Energy.gov Resources", "url": "https://www.energy.gov" }
    ]
  },
  {
    "role": "Automotive Engineer",
    "title": "Automotive Engineer Roadmap",
    "steps": [
      { "task": "Basics of vehicle dynamics & thermodynamics", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "CAD tools (SolidWorks, CATIA)", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Automobile powertrain & EV technologies", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Internship or hands-on automotive workshop", "minWeeks": 6, "maxWeeks": 8 }
    ],
    "resources": [
      { "name": "SAE Automotive Engineering", "url": "https://www.sae.org" }
    ]
  },
  {
    "role": "Design Engineer",
    "title": "Design Engineer Roadmap",
    "steps": [
      { "task": "Learn engineering drawing & CAD tools", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Finite Element Analysis (ANSYS, Abaqus)", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Product design & prototyping", "minWeeks": 3, "maxWeeks": 5 },
      { "task": "Work on real design case studies", "minWeeks": 4, "maxWeeks": 6 }
    ],
    "resources": [
      { "name": "Autodesk Learning Hub", "url": "https://www.autodesk.com" }
    ]
  },
  {
    "role": "R&D Specialist",
    "title": "R&D Specialist Roadmap",
    "steps": [
      { "task": "Strong fundamentals in chosen field", "minWeeks": 6, "maxWeeks": 8 },
      { "task": "Research methodology & paper writing", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Work on lab-based projects", "minWeeks": 6, "maxWeeks": 8 },
      { "task": "Publish or present findings", "minWeeks": 4, "maxWeeks": 6 }
    ],
    "resources": [
      { "name": "IEEE Research Papers", "url": "https://ieeexplore.ieee.org" }
    ]
  },
  {
    "role": "Site Engineer",
    "title": "Site Engineer Roadmap",
    "steps": [
      { "task": "Learn construction site safety & procedures", "minWeeks": 2, "maxWeeks": 3 },
      { "task": "Structural drawings & CAD", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Project supervision & site management", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Hands-on site training", "minWeeks": 6, "maxWeeks": 8 }
    ],
    "resources": [
      { "name": "Civil Engineering Portal", "url": "https://www.civilengineeringportal.com" }
    ]
  },
  {
    "role": "Urban Planner",
    "title": "Urban Planner Roadmap",
    "steps": [
      { "task": "Basics of urban development & land use", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "GIS & spatial analysis tools", "minWeeks": 3, "maxWeeks": 5 },
      { "task": "Sustainable city planning", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Case studies in smart cities", "minWeeks": 3, "maxWeeks": 5 }
    ],
    "resources": [
      { "name": "UN-Habitat Urban Planning", "url": "https://unhabitat.org" }
    ]
  },
  {
    "role": "Infrastructure Analyst",
    "title": "Infrastructure Analyst Roadmap",
    "steps": [
      { "task": "Learn basics of large-scale infrastructure projects", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Cost estimation & project management", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Risk analysis in infrastructure", "minWeeks": 3, "maxWeeks": 5 },
      { "task": "Internship with infra company", "minWeeks": 4, "maxWeeks": 6 }
    ],
    "resources": [
      { "name": "World Bank Infrastructure", "url": "https://www.worldbank.org/en/topic/infrastructure" }
    ]
  },
  {
    "role": "AI Researcher",
    "title": "AI Researcher Roadmap",
    "steps": [
      { "task": "Strong foundations in math (linear algebra, probability)", "minWeeks": 6, "maxWeeks": 8 },
      { "task": "Machine Learning algorithms", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Deep learning frameworks (TensorFlow, PyTorch)", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Publish AI research papers", "minWeeks": 6, "maxWeeks": 10 }
    ],
    "resources": [
      { "name": "DeepLearning.AI", "url": "https://www.deeplearning.ai" }
    ]
  },
  {
    "role": "Innovation Consultant",
    "title": "Innovation Consultant Roadmap",
    "steps": [
      { "task": "Learn design thinking & innovation frameworks", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Case studies of innovative companies", "minWeeks": 2, "maxWeeks": 3 },
      { "task": "Work on consulting projects", "minWeeks": 4, "maxWeeks": 6 }
    ],
    "resources": [
      { "name": "IDEO Design Thinking", "url": "https://designthinking.ideo.com" }
    ]
  },
  {
    "role": "Tech Futurist",
    "title": "Tech Futurist Roadmap",
    "steps": [
      { "task": "Study emerging technologies (AI, Quantum, Blockchain)", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Understand market adoption trends", "minWeeks": 3, "maxWeeks": 5 },
      { "task": "Publish blogs/reports on future tech", "minWeeks": 4, "maxWeeks": 6 }
    ],
    "resources": [
      { "name": "Gartner Emerging Tech Reports", "url": "https://www.gartner.com" }
    ]
  },
  {
    "role": "Startup Founder",
    "title": "Startup Founder Roadmap",
    "steps": [
      { "task": "Learn business model canvas & lean startup", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Market research & validation", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Build MVP (minimum viable product)", "minWeeks": 6, "maxWeeks": 8 },
      { "task": "Pitch to investors", "minWeeks": 2, "maxWeeks": 3 }
    ],
    "resources": [
      { "name": "Y Combinator Startup School", "url": "https://www.startupschool.org" }
    ]
  },
  {
    "role": "Product Manager",
    "title": "Product Manager Roadmap",
    "steps": [
      { "task": "Basics of product lifecycle", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Learn Agile/Scrum methodologies", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Work with cross-functional teams", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Case studies of successful products", "minWeeks": 2, "maxWeeks": 3 }
    ],
    "resources": [
      { "name": "Scrum.org Resources", "url": "https://www.scrum.org" }
    ]
  },
  {
    "role": "Tech Consultant",
    "title": "Tech Consultant Roadmap",
    "steps": [
      { "task": "Understand IT systems & business needs", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Case studies of IT transformation", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Client communication & reporting", "minWeeks": 2, "maxWeeks": 3 }
    ],
    "resources": [
      { "name": "BCG Consulting Resources", "url": "https://www.bcg.com" }
    ]
  },
  {
    "role": "Project Engineer",
    "title": "Project Engineer Roadmap",
    "steps": [
      { "task": "Basics of project management", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Learn MS Project / Primavera tools", "minWeeks": 3, "maxWeeks": 5 },
      { "task": "Work on project site execution", "minWeeks": 4, "maxWeeks": 6 }
    ],
    "resources": [
      { "name": "PMI Resources", "url": "https://www.pmi.org" }
    ]
  },
  {
    "role": "Plant Supervisor",
    "title": "Plant Supervisor Roadmap",
    "steps": [
      { "task": "Basics of plant operations & safety", "minWeeks": 2, "maxWeeks": 3 },
      { "task": "Learn production management", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Work on plant internship", "minWeeks": 4, "maxWeeks": 6 }
    ],
    "resources": [
      { "name": "Lean Manufacturing Guide", "url": "https://www.lean.org" }
    ]
  },
  {
    "role": "PSU Officer",
    "title": "PSU Officer Roadmap",
    "steps": [
      { "task": "Prepare for GATE/IES exams", "minWeeks": 6, "maxWeeks": 12 },
      { "task": "Work on technical & aptitude practice", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Interview preparation", "minWeeks": 2, "maxWeeks": 3 }
    ],
    "resources": [
      { "name": "Made Easy Academy", "url": "https://www.madeeasy.in" }
    ]
  },
  {
    "role": "PSU Engineer",
    "title": "PSU Engineer Roadmap",
    "steps": [
      { "task": "Prepare for PSU technical exams", "minWeeks": 6, "maxWeeks": 10 },
      { "task": "Work on past year papers", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Technical + HR interview prep", "minWeeks": 3, "maxWeeks": 4 }
    ],
    "resources": [
      { "name": "GATE Academy", "url": "https://gateacademy.co.in" }
    ]
  },
  {
    "role": "Govt Analyst",
    "title": "Government Analyst Roadmap",
    "steps": [
      { "task": "General studies & aptitude", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Domain-specific govt syllabus", "minWeeks": 6, "maxWeeks": 8 },
      { "task": "Mock tests & past papers", "minWeeks": 3, "maxWeeks": 4 }
    ],
    "resources": [
      { "name": "UPSC Resources", "url": "https://www.upsc.gov.in" }
    ]
  },
  {
    "role": "Administrative Officer",
    "title": "Administrative Officer Roadmap",
    "steps": [
      { "task": "Study public administration & policy", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "General aptitude & reasoning", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Case studies & role plays", "minWeeks": 2, "maxWeeks": 3 }
    ],
    "resources": [
      { "name": "Indian Administrative Services Resources", "url": "https://www.iasexamportal.com" }
    ]
  },
  {
    "role": "Generalist",
    "title": "Generalist Career Roadmap",
    "steps": [
      { "task": "Explore multiple domains through online courses", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Internships in diverse fields", "minWeeks": 4, "maxWeeks": 6 },
      { "task": "Decide specialization after exposure", "minWeeks": 2, "maxWeeks": 3 }
    ],
    "resources": [
      { "name": "Coursera Explore", "url": "https://www.coursera.org" }
    ]
  },
  {
    "role": "Intern",
    "title": "Internship Roadmap",
    "steps": [
      { "task": "Resume & LinkedIn preparation", "minWeeks": 1, "maxWeeks": 2 },
      { "task": "Apply to internships via portals", "minWeeks": 2, "maxWeeks": 3 },
      { "task": "Work on internship deliverables", "minWeeks": 6, "maxWeeks": 8 }
    ],
    "resources": [
      { "name": "Internshala", "url": "https://internshala.com" }
    ]
  },
  {
    "role": "Career Explorer",
    "title": "Career Explorer Roadmap",
    "steps": [
      { "task": "Take multiple quizzes/assessments", "minWeeks": 2, "maxWeeks": 3 },
      { "task": "Participate in hackathons & workshops", "minWeeks": 3, "maxWeeks": 4 },
      { "task": "Shadow professionals in different domains", "minWeeks": 2, "maxWeeks": 3 }
    ],
    "resources": [
      { "name": "edX Explore Careers", "url": "https://www.edx.org" }
    ]
  }
]

// Load roadmap.json and render roadmap
function generateRoadmap(role) {
  const learningTime = quizAnswers[8]; // Q9 answer
  const pace = paceMultipliers[learningTime] || 1.0;

  const roadmap = roadmaps.find(r => r.role === role);

      if (!roadmap) {
        quizElements.quizArea.innerHTML += `<p>⚠️ No roadmap found for ${role}</p>`;
        return;
      }

      quizElements.quizArea.innerHTML = `
        <div class="roadmap-container">
            <h2 class="roadmap-title">🎯 ${roadmap.title}</h2>
            <div class="roadmap-steps">
            ${roadmap.steps.map((s, i) => `
                <div class="step">
                <button class="accordion">
                    <span class="step-circle">${i + 1}</span> ${s.task}
                </button>
                <div class="panel">
                    <p>⏱ ${adjustDuration(s.minWeeks, s.maxWeeks, pace)}</p>
                </div>
                </div>
            `).join("")}
            </div>
            <h3 class="resources-title">📚 Resources</h3>
            <ul class="resources-list">
            ${roadmap.resources.map(r =>`<li><a href="${r.url}" target="_blank">${r.name}</a></li>`).join("")}
            </ul>
            <button id="downloadPDF" class="btn">⬇ Download PDF</button>

            <!-- AI assistant floating button and quick links -->
            <button class="ai-fab" id="aiFab" aria-label="AI assistants">
                <i class='bx bxs-bot'></i>
            </button>
            <div class="ai-menu" id="aiMenu" aria-hidden="true">
                <a href="https://chat.deepseek.com/" target="_blank" rel="noopener noreferrer">
                    <i class='bx bxs-bot'></i>
                    <span>DeepSeek</span>
                </a>
                <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer">
                    <i class='bx bxl-google'></i>
                    <span>Gemini</span>
                </a>
                <a href="https://roadmap.sh/" target="_blank" rel="noopener noreferrer">
                    <i class='bx bx-map-alt'></i>
                    <span>Roadmap.sh</span>
                </a>
                <a href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">
                    <i class='bx bx-brain'></i>
                    <span>ChatGPT</span>
                </a>
            </div>
        </div>
        `;
        // Accordion behavior
        document.querySelectorAll(".accordion").forEach(btn => {
            btn.addEventListener("click", function () {
                this.classList.toggle("active");
                const panel = this.nextElementSibling;
                panel.style.maxHeight = panel.style.maxHeight ? null : panel.scrollHeight + "px";
            });
        });

        document.getElementById("downloadPDF").addEventListener("click", () => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            let y = 20;

            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text(`${roadmap.title}`, 20, y);
            y += 10;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);

            // Steps
            doc.text("Roadmap Steps:", 20, y);
            y += 8;
            roadmap.steps.forEach((s, i) => {
                doc.text(`${i + 1}. ${s.task} — ${adjustDuration(s.minWeeks, s.maxWeeks, pace)}`, 20, y);
                y += 8;
                if (y > 270) { doc.addPage(); y = 20; }
            });

            // Resources
            y += 5;
            doc.setFont("helvetica", "bold");
            doc.text("Resources:", 20, y);
            y += 8;
            doc.setFont("helvetica", "normal");
            roadmap.resources.forEach((r, i) => {
                doc.text(`${i + 1}. ${r.name}: ${r.url}`, 20, y);
                y += 8;
                if (y > 270) { doc.addPage(); y = 20; }
            });

            doc.save(`${roadmap.role}_roadmap.pdf`);
        });

        // AI FAB interactions
        const aiFab = document.getElementById('aiFab');
        const aiMenu = document.getElementById('aiMenu');
        if (aiFab && aiMenu) {
            aiFab.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = aiMenu.getAttribute('data-open') === 'true';
                if (isOpen) {
                    aiMenu.setAttribute('data-open', 'false');
                    aiMenu.setAttribute('aria-hidden', 'true');
                } else {
                    aiMenu.setAttribute('data-open', 'true');
                    aiMenu.setAttribute('aria-hidden', 'false');
                }
            });

            // Close when clicking outside
            document.addEventListener('click', (evt) => {
                if (!aiMenu.contains(evt.target) && evt.target !== aiFab) {
                    aiMenu.setAttribute('data-open', 'false');
                    aiMenu.setAttribute('aria-hidden', 'true');
                }
            }, { capture: true });
        }


        // Back button to choose another role
        // document.getElementById("backBtn").addEventListener("click", () => {
        //     showResults(); // regenerate buttons
        // });
    }

    function nextQuestion() {
        const select = document.querySelector('select');
        if (select && select.value === '') {
            if (window.toast) {
                toast.error('Please select an option before continuing.');
            }
            return;
        }
        if (select) quizAnswers.push(select.value);

        currentQuestion++;
        displayQuestion();
    }

    // Initialize quiz elements
    initQuizElements();
    
    // Debug: Check if elements were found
    console.log('Quiz elements initialized:', {
        container: !!quizElements.container,
        quizSection: !!quizElements.quizSection,
        quizArea: !!quizElements.quizArea,
        nextBtn: !!quizElements.nextBtn,
    });
    
    // Event listeners for quiz (with error handling)
    if (quizElements.nextBtn) {
        quizElements.nextBtn.addEventListener('click', nextQuestion);
        console.log('Next button event listener added');
    } else {
        console.error('Next button not found!');
    }

    // Test toast system on page load
    if (window.toast) {
        setTimeout(() => {
            toast.success('Welcome to Neotix! Login/Registration system is ready.');
        }, 500);
    }

    console.log('All event listeners attached successfully!');
});