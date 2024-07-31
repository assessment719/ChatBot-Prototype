function toggleChat() {
    var welcomechat = document.getElementById('welcome-chat');
    var welcomechatcloserbutton = document.getElementById('welcome-chat-closerbutton');
    var chatContainer = document.getElementById('chat-container');
    var image1 = document.getElementById('Image1');
    var image2 = document.getElementById('Image2');

    if (welcomechat.style.display === 'block' || chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        welcomechat.style.display = 'none';
        chatContainer.style.display = 'flex';
        welcomechatcloserbutton.style.display = 'none';
        image1.style.opacity = '0';
        image2.style.display = 'block';
        setTimeout(function () {
            image2.style.opacity = '1';
            image1.style.display = 'none';
        }, 0);
        reloadChatBox()
    } else {
        welcomechat.style.display = 'flex'
        chatContainer.style.display = 'none';
        welcomechatcloserbutton.style.display = 'block';
        image2.style.opacity = '0';
        image1.style.display = 'block';
        setTimeout(function () {
            image1.style.opacity = '1';
            image2.style.display = 'none';
        }, 0);
    }
}

function closewelcomeChat() {
    var welcomechat = document.getElementById('welcome-chat');
    var welcomechatcloserbutton = document.getElementById('welcome-chat-closerbutton');

    welcomechat.style.display = 'none';
    welcomechatcloserbutton.style.display = 'none';
}

function reloadChatBox() {
    chatBody.innerHTML = '';
    questionList.style.display = 'none';
    addMessage("Hello! How can I assist you today?<br>Please choose your query from the FAQ menu.", 'bot');
    loadInitialQuestions();
    hideInputContainer();
}

const chatBody = document.getElementById('chatBody');
const questionList = document.getElementById('questionList');
const inputContainer = document.getElementById('inputContainer');
const marksInput = document.getElementById('marksInput');

const preloadedQA = {
    "What is your name?": "I am a chatbot created to assist you.",
    "How can you help me?": "I can answer your questions and provide information.",
    "I have queries regarding undergraduate entry requirements": "What kind of undergraduate entry requirements are you concerned about? Choose your type of query from the menu.",
    "I have queries regarding postgraduate entry requirements": "What kind of postgraduate entry requirements are you concerned about? Choose your type of query from the menu.",
};

const ugEntryRequirementOptions = {
    "Academic requirements for undergraduate courses": "Please select your board.",
    "English Waiver requirements for undergraduate courses": "Please select your board of education.",
    "English Language Test requirements for undergraduate courses": "Please select your English test.",
    "I am searching for some universities which are available in a specific city": "Are you looking for which city's university names? Plaese select your desired city to study from the menu",
    "Restart the chat": "Hello! How can I assist you again?<br>Please choose your query from the FAQ menu.",
};

const pgEntryRequirementOptions = {
    "Academic requirements for postgraduate courses": "Please select your university.",
    "English Waiver requirements for postgraduate courses": "Please select your board of education.",
    "MOI Waiver requirements for postgraduate courses": "Please select your university of education.",
    "English Language Test requirements for postgraduate courses": "Please select your English test.",
    "I am searching for some universities which are available in a specific city": "Are you looking for which city's university names? Plaese select your desired city to study from the menu",
    "Restart the chat": "Hello! How can I assist you again?<br>Please choose your query from the FAQ menu.",
};

const ugBoards = {
    "CBSE": "Central Board of Secondary Education",
    "ICSE": "Indian Certificate of Secondary Education",
    "State Board": "Various State Boards",
};

const pgUniversities = {
    "Delhi University": "University of Delhi",
    "Mumbai University": "University of Mumbai",
    "Bangalore University": "Bangalore University",
};

const englishTests = {
    "TOEFL": "TOEFL",
    "IELTS": "IELTS",
    "PTE": "PTE",
};

const cityLocation = {
    "London": "London",
    "Birmingham": "Birmingham",
    "Manchester": "Manchester",
    "Leicester": "Leicester",
};

let selectedCourseType = '';
let selectedEntryRequirement = '';
let selectedOption = '';
let selectedCity = '';

function addMessage(content, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    const avatar = document.createElement('img');
    avatar.src = "ChatBot DP.jpg";
    avatar.classList.add('avatar');

    const messageContent = document.createElement('div');
    messageContent.classList.add('content');
    messageContent.innerHTML = content;

    if (sender === 'bot') {
        messageElement.appendChild(avatar);
    }

    messageElement.appendChild(messageContent);
    chatBody.appendChild(messageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showTypingAnimation() {
    const typingElement = document.createElement('div');
    typingElement.classList.add('message', 'bot', 'typing');

    const avatar = document.createElement('img');
    avatar.src = "ChatBot DP.jpg";
    avatar.classList.add('avatar');

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');

    typingElement.appendChild(avatar);
    typingElement.appendChild(contentContainer);

    const typingAnimation = document.createElement('div');
    typingAnimation.classList.add('typing-animation');
    typingAnimation.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span>';

    contentContainer.appendChild(typingAnimation);

    chatBody.appendChild(typingElement);
    chatBody.scrollTop = chatBody.scrollHeight;

    return typingElement;
}

function toggleQuestionList() {
    questionList.style.display = questionList.style.display === 'none' ? 'block' : 'none';
    questionList.scrollTop = 0;
}

function selectQuestion(question) {
    addMessage(question, 'user');
    const typingElement = showTypingAnimation();
    setTimeout(() => {
        chatBody.removeChild(typingElement);
        const botResponse = preloadedQA[question] || "I'm sorry, I don't understand that.";
        addMessage(botResponse, 'bot');
        if (question === "I have queries regarding undergraduate entry requirements") {
            selectedCourseType = 'ug';
            updateQuestionList(ugEntryRequirementOptions);
        } else if (question === "I have queries regarding postgraduate entry requirements") {
            selectedCourseType = 'pg';
            updateQuestionList(pgEntryRequirementOptions);
        }
    }, 3000);
    toggleQuestionList();
}

function updateQuestionList(questions) {
    questionList.innerHTML = '';
    for (let question in questions) {
        const questionElement = document.createElement('div');
        questionElement.textContent = question;
        questionElement.onclick = () => selectEntryRequirement(question);
        questionList.appendChild(questionElement);
    }
}

function selectEntryRequirement(option) {
    selectedEntryRequirement = option;
    addMessage(option, 'user');
    const typingElement = showTypingAnimation();
    setTimeout(() => {
        chatBody.removeChild(typingElement);
        let botResponse;
        if (option === 'Academic requirements for undergraduate courses' || option === 'Academic requirements for postgraduate courses') {
            updateOptionList(option === 'Academic requirements for undergraduate courses' ? ugBoards : pgUniversities);
            botResponse = "Please select your " + (selectedCourseType === 'ug' ? "board" : "university") + " of education from the list.";
        } else if (option === 'English Waiver requirements for undergraduate courses' || option === 'English Waiver requirements for postgraduate courses') {
            updateOptionList(ugBoards);
            botResponse = "Please select your board of education from the list.";
        } else if (option === 'MOI Waiver requirements for postgraduate courses') {
            updateOptionList(pgUniversities);
            botResponse = "Please select your university of education from the list.";
        } else if (option === 'English Language Test requirements for undergraduate courses' || option === 'English Language Test requirements for postgraduate courses') {
            updateOptionList(englishTests);
            botResponse = "Please select your English test from the list.";
        } else if (option === 'I am searching for some universities which are available in a specific city') {
            updateOptionList(cityLocation);
            botResponse = "What is your desired city to study in UK? Plaese select your desired city to study from the menu";
        } else if (option === 'Restart the chat') {
            botResponse = "Hello! How can I assist you again?<br>Please choose your query from the FAQ menu.";
            loadInitialQuestions();
            selectedCourseType = '';
            selectedEntryRequirement = '';
            hideInputContainer();
        } else {
            botResponse = selectedCourseType === 'ug' ? ugEntryRequirementOptions[option] : pgEntryRequirementOptions[option];
            hideInputContainer();
        }
        addMessage(botResponse, 'bot');
    }, 3000);
    toggleQuestionList();
}

function updateOptionList(options) {
    questionList.innerHTML = '<select class="js-example-basic-single" id="selectOptions"><option></option></select>';
    for (let option in options) {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = options[option];
        document.getElementById('selectOptions').appendChild(optionElement);
    }
    $('.js-example-basic-single').select2({
        placeholder: "Select an option",
        allowClear: true
    });

    $('#selectOptions').on('change', function () {
        const selectedOption = $(this).val();
        if (selectedOption) {
            selectBoardOrUniversityOrTest(selectedOption);
            $(this).val(null).trigger('change');
        }
    });
    questionList.style.display = 'none';
}

function selectBoardOrUniversityOrTest(option) {
    selectedOption = option;
    addMessage(option, 'user');
    const typingElement = showTypingAnimation();
    setTimeout(() => {
        chatBody.removeChild(typingElement);
        let botResponse;
        if (selectedEntryRequirement === 'Academic requirements for undergraduate courses' || selectedEntryRequirement === 'Academic requirements for postgraduate courses') {
            botResponse = `How many percentile marks have you scored in your ${selectedCourseType === 'ug' ? 'higher secondary' : 'undergraduate'} exam? Please enter below.`;
            showInputContainer();
        } else if (selectedEntryRequirement === 'English Waiver requirements for undergraduate courses' || selectedEntryRequirement === 'English Waiver requirements for postgraduate courses') {
            botResponse = `Please enter your english subject score in your higher secondary exam below to check if you qualify for an English waiver.`;
            showInputContainer();
        } else if (selectedEntryRequirement === 'English Language Test requirements for undergraduate courses' || selectedEntryRequirement === 'English Language Test requirements for postgraduate courses') {
            botResponse = `Please enter your score in the ${option} exam below to check if you meet the English language requirements.`;
            showInputContainer();
        } else if (selectedEntryRequirement === 'I am searching for some universities which are available in a specific city') {
            selectedCity = option;
            if (selectedOption === 'London') {
                botResponse = `The below metioned universities are available in ${encodeURIComponent(selectedCity)}: <br>1.Coventry University`;
            } else if (selectedOption === 'Leicester') {
                botResponse = `The below metioned universities are available in ${encodeURIComponent(selectedCity)}: <br>1.De Montfort University`;
            } else {
                botResponse = `Unfortunately, there are no universities situated in ${encodeURIComponent(selectedCity)}`;
            }
            updateQuestionList(selectedCourseType === 'ug' ? ugEntryRequirementOptions : pgEntryRequirementOptions);
        } else if (selectedEntryRequirement === 'MOI Waiver requirements for postgraduate courses') {
            if (selectedOption === 'Delhi University') {
                botResponse = "You are eligible to get admission in the following universities:<br>1. University of Birmingham<br>2. University of Glasgow";
            } else if (selectedOption === 'Mumbai University') {
                botResponse = "You are eligible to get admission in the following universities:<br>1. University of Leeds<br>2. University of Manchester";
            } else {
                botResponse = "Unfortunately, you do not meet the minimum eligibility criteria for the selected university.";
            }
            updateQuestionList(selectedCourseType === 'ug' ? ugEntryRequirementOptions : pgEntryRequirementOptions);
        }
        addMessage(botResponse, 'bot');
    }, 3000);
    toggleQuestionList();
}

function showInputContainer() {
    inputContainer.style.display = 'flex';
}

function hideInputContainer() {
    inputContainer.style.display = 'none';
}

function submitMarks() {
    const marks = parseInt(marksInput.value, 10);
    addMessage(`I have scored ${marks}`, 'user');
    const typingElement = showTypingAnimation();
    hideInputContainer();
    marksInput.value = '0';
    setTimeout(() => {
        chatBody.removeChild(typingElement);
        let botResponse;
        if (selectedEntryRequirement === 'Academic requirements for undergraduate courses') {
            if (selectedOption === 'CBSE' && marks >= 90) {
                botResponse = "You are eligible to get admission in the following universities:<br>1. Anglia Ruskin University<br>2. Coventry University";
            } else if (selectedOption === 'ICSE' && marks >= 85) {
                botResponse = "You are eligible to get admission in the following universities:<br>1. Birmingham City University<br>2. Bangor University";
            } else {
                botResponse = "Unfortunately, you do not meet the minimum eligibility criteria for the selected board.";
            }
        } else if (selectedEntryRequirement === 'Academic requirements for postgraduate courses') {
            if (selectedOption === 'Delhi University' && marks >= 60) {
                botResponse = "You are eligible to get admission in the following universities:<br>1. University of Birmingham<br>2. University of Glasgow";
            } else if (selectedOption === 'Mumbai University' && marks >= 55) {
                botResponse = "You are eligible to get admission in the following universities:<br>1. University of Leeds<br>2. University of Manchester";
            } else {
                botResponse = "Unfortunately, you do not meet the minimum eligibility criteria for the selected university.";
            }
        } else if (selectedEntryRequirement === 'English Waiver requirements for undergraduate courses' || selectedEntryRequirement === 'English Waiver requirements for postgraduate courses') {
            if (selectedOption === 'CBSE' && marks >= 70) {
                botResponse = "You qualify for an English waiver based on your academic performance.";
            } else if (selectedOption === 'ICSE' && marks >= 65) {
                botResponse = "You qualify for an English waiver based on your academic performance.";
            } else {
                botResponse = "Unfortunately, you do not qualify for an English waiver.";
            }
        } else if (selectedEntryRequirement === 'English Language Test requirements for undergraduate courses' || selectedEntryRequirement === 'English Language Test requirements for postgraduate courses') {
            if ((selectedOption === 'TOEFL' && marks >= 80) || (selectedOption === 'IELTS' && marks >= 6.5) || (selectedOption === 'PTE' && marks >= 58)) {
                botResponse = "You meet the English language requirements for admission.";
            } else {
                botResponse = "Unfortunately, you do not meet the minimum criteria for the selected English test.";
            }
        }
        addMessage(botResponse, 'bot');
        updateQuestionList(selectedCourseType === 'ug' ? ugEntryRequirementOptions : pgEntryRequirementOptions);
    }, 3000);
}

function clearMessages() {
    chatBody.innerHTML = '';
    addMessage("Hello! How can I assist you again?<br>Please choose your query from the FAQ menu.", 'bot');
    loadInitialQuestions();
    selectedCourseType = '';
    selectedEntryRequirement = '';
    selectedBoardOrUniversity = '';
    hideInputContainer();

    if (questionList.style.display === 'block') {
        questionList.style.display = 'none';
    }
}

function loadInitialQuestions() {
    questionList.innerHTML = '';
    for (let question in preloadedQA) {
        const questionElement = document.createElement('div');
        questionElement.textContent = question;
        questionElement.onclick = () => selectQuestion(question);
        questionList.appendChild(questionElement);
    }
}