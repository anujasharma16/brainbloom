/* "Bear & Bunny Show": a short funny skit per lesson, unlocked after passing the quiz.
   Pinky makes a silly mistake, Bruno fixes it, and the punchline is the lesson.
   Scene: [speaker, en, fr, es, hi, visual, mood]; mood 'oops' = shake/gasp, 'cheer' = jump. */
const _sk = (who, en, fr, es, hi, v, mood = '') => ({ ..._sc(who, en, fr, es, hi, v), mood });

const SKITS = {
  'what-is-ai': [
    _sk('bunny', 'Bruno! My toaster burned my toast. The toaster AI hates me!', 'Bruno ! Mon grille-pain a brûlé ma tartine. L\'IA du grille-pain me déteste !', '¡Bruno! Mi tostadora quemó mi tostada. ¡La IA de la tostadora me odia!', 'ब्रूनो! मेरे टोस्टर ने मेरा टोस्ट जला दिया। टोस्टर का AI मुझसे नफ़रत करता है!', '🍞 🔥 😠', 'oops'),
    _sk('bear', 'Pinky, a normal toaster has no AI. It just heats bread on a timer.', "Pinky, un grille-pain normal n'a pas d'IA. Il chauffe le pain avec une minuterie.", 'Pinky, una tostadora normal no tiene IA. Solo calienta el pan con un temporizador.', 'पिंकी, आम टोस्टर में AI नहीं होता। वह बस टाइमर पर ब्रेड गरम करता है।', '⏲️ → 🍞 → ♨️'),
    _sk('bunny', 'So who is the AI? My phone camera that finds my face?', "Alors c'est qui l'IA ? L'appareil photo de mon téléphone qui trouve mon visage ?", '¿Entonces quién es la IA? ¿La cámara de mi teléfono que encuentra mi cara?', 'तो AI कौन है? मेरे फ़ोन का कैमरा जो मेरा चेहरा ढूँढता है?', '📷 🐰 🔍'),
    _sk('bear', 'Yes! It learned patterns from examples. And no feelings, so no hate!', "Oui ! Elle a appris des motifs à partir d'exemples. Et pas d'émotions, donc pas de haine !", '¡Sí! Aprendió patrones de ejemplos. Y no tiene sentimientos, ¡así que no hay odio!', 'हाँ! उसने उदाहरणों से पैटर्न सीखे हैं। और भावनाएँ नहीं, तो नफ़रत भी नहीं!', '📷 🧠 ✅ 💖❌', 'cheer'),
  ],
  'how-ai-learns': [
    _sk('bunny', 'I trained my AI to spot cats. I only showed it my fluffy white cat.', "J'ai entraîné mon IA à repérer les chats. Je lui ai montré seulement mon chat blanc et duveteux.", 'Entrené mi IA para detectar gatos. Solo le mostré mi gato blanco y peludo.', 'मैंने अपने AI को बिल्लियाँ पहचानना सिखाया। मैंने उसे सिर्फ़ अपनी रोएँदार सफ़ेद बिल्ली दिखाई।', '🐱 🤍'),
    _sk('bear', 'And then what happened?', "Et alors, que s'est-il passé ?", '¿Y qué pasó?', 'फिर क्या हुआ?', '🤔'),
    _sk('bunny', "It looked at my neighbor's black cat and said: potato!", "Il a regardé le chat noir de mon voisin et a dit : patate !", 'Miró al gato negro de mi vecino y dijo: ¡papa!', 'उसने पड़ोसी की काली बिल्ली को देखकर कहा: आलू!', '🐈‍⬛ ❓ 🥔', 'oops'),
    _sk('bear', 'Ha! Too few examples. Show many cats: black, white, big, small. Better data, better AI!', "Ha ! Trop peu d'exemples. Montrez beaucoup de chats : noirs, blancs, gros, petits. Meilleures données, meilleure IA !", '¡Ja! Muy pocos ejemplos. Muestra muchos gatos: negros, blancos, grandes, pequeños. ¡Mejores datos, mejor IA!', 'हा! उदाहरण बहुत कम थे। कई बिल्लियाँ दिखाओ: काली, सफ़ेद, बड़ी, छोटी। बेहतर डेटा, बेहतर AI!', '🐱 🐈‍⬛ 🐯 → 🧠 ✅', 'cheer'),
  ],
  'first-prompt': [
    _sk('bunny', 'I told the AI: "Make food". It gave me a recipe for 40 bowls of soup!', "J'ai dit à l'IA : « Fais de la nourriture ». Elle m'a donné une recette pour 40 bols de soupe !", 'Le dije a la IA: «Haz comida». ¡Me dio una receta para 40 platos de sopa!', 'मैंने AI से कहा: "खाना बनाओ"। उसने 40 कटोरी सूप की रेसिपी दे दी!', '🍲 🍲 🍲 😵', 'oops'),
    _sk('bear', "'Food' is too vague, Pinky. Say the task, give context, ask for a format.", "« Nourriture » est trop vague, Pinky. Dites la tâche, donnez le contexte, demandez un format.", '«Comida» es muy vago, Pinky. Di la tarea, da contexto y pide un formato.', "'खाना' बहुत अस्पष्ट है, पिंकी। काम बताओ, संदर्भ दो, फ़ॉर्मैट माँगो।", '💬 ❓ 🎯'),
    _sk('bunny', '"Give me a 5-minute cheese sandwich recipe for one person, in 3 steps."', '« Donne-moi une recette de sandwich au fromage en 5 minutes pour une personne, en 3 étapes. »', '«Dame una receta de sándwich de queso en 5 minutos para una persona, en 3 pasos.»', '"एक व्यक्ति के लिए 5 मिनट में बनने वाले चीज़ सैंडविच की रेसिपी 3 चरणों में दो।"', '🧀 🥪 1️⃣ 2️⃣ 3️⃣'),
    _sk('bear', 'Perfect! Clear prompts make tasty answers.', 'Parfait ! Des prompts clairs donnent des réponses savoureuses.', '¡Perfecto! Los prompts claros dan respuestas sabrosas.', 'बढ़िया! साफ़ प्रॉम्प्ट से स्वादिष्ट जवाब मिलते हैं।', '🥪 ✨ 😋', 'cheer'),
  ],
  'daily-life': [
    _sk('bunny', 'I asked the chatbot to remember my phone password: carrot123!', "J'ai demandé au robot de retenir le mot de passe de mon téléphone : carotte123 !", 'Le pedí al chatbot que recordara la contraseña de mi teléfono: ¡zanahoria123!', 'मैंने चैटबॉट से अपने फ़ोन का पासवर्ड याद रखने को कहा: carrot123!', '🔑 🥕', 'oops'),
    _sk('bear', 'Pinky! Never share passwords with a public chatbot!', 'Pinky ! Ne partagez jamais de mots de passe avec un robot public !', '¡Pinky! ¡Nunca compartas contraseñas con un chatbot público!', 'पिंकी! सार्वजनिक चैटबॉट के साथ कभी पासवर्ड साझा मत करो!', '🚫 🔒 🤖', 'oops'),
    _sk('bunny', 'Oops. Can it still plan my carrot garden?', 'Oups. Peut-il quand même planifier mon potager de carottes ?', 'Uy. ¿Puede al menos planear mi huerto de zanahorias?', 'उफ़। क्या वह मेरे गाजर के बगीचे की योजना बना सकता है?', '🥕 🌱 🤔'),
    _sk('bear', 'Yes! AI is great for plans and ideas. Keep secrets secret, and double-check big facts.', "Oui ! L'IA est super pour les plans et les idées. Gardez les secrets secrets et vérifiez les faits importants.", '¡Sí! La IA es genial para planes e ideas. Guarda los secretos y verifica los datos importantes.', 'हाँ! AI योजनाओं और विचारों के लिए बढ़िया है। राज़ राज़ रखो और बड़े तथ्य दोबारा जाँचो।', '🌱 ✅ 🔒 🔍', 'cheer'),
  ],
  'better-prompts': [
    _sk('bunny', 'I asked: "Write a poem." It wrote about taxes!', "J'ai demandé : « Écris un poème. » Il a écrit sur les impôts !", 'Pedí: «Escribe un poema». ¡Escribió sobre impuestos!', 'मैंने कहा: "कविता लिखो।" उसने टैक्स पर कविता लिख दी!', '📜 💸 😵', 'oops'),
    _sk('bear', 'Add the four ingredients: role, context, task and format. Try again!', 'Ajoutez les quatre ingrédients : rôle, contexte, tâche et format. Réessayez !', 'Añade los cuatro ingredientes: rol, contexto, tarea y formato. ¡Inténtalo otra vez!', 'चार घटक जोड़ो: भूमिका, संदर्भ, काम और फ़ॉर्मैट। फिर कोशिश करो!', '🎭 🌍 🎯 📋'),
    _sk('bunny', '"Act as a kind poet. Write 4 funny lines about carrots for kids."', '« Agis comme un poète gentil. Écris 4 vers drôles sur les carottes pour les enfants. »', '«Actúa como un poeta amable. Escribe 4 versos graciosos sobre zanahorias para niños.»', '"एक दयालु कवि की तरह काम करो। बच्चों के लिए गाजर पर 4 मज़ेदार पंक्तियाँ लिखो।"', '🥕 📝 😂'),
    _sk('bear', 'A carrot masterpiece! Details make answers better.', "Un chef-d'œuvre de carotte ! Les détails améliorent les réponses.", '¡Una obra maestra de zanahoria! Los detalles mejoran las respuestas.', 'गाजर की उत्कृष्ट रचना! ब्योरे जवाब को बेहतर बनाते हैं।', '🥕 🏆 👏', 'cheer'),
  ],
  'check-the-ai': [
    _sk('bunny', 'The AI told me the moon is made of cheese, with total confidence!', "L'IA m'a dit que la lune est faite de fromage, avec une confiance totale !", '¡La IA me dijo que la luna es de queso, con total seguridad!', 'AI ने पूरे आत्मविश्वास से कहा कि चाँद चीज़ का बना है!', '🌙 🧀 😎', 'oops'),
    _sk('bear', "That's a hallucination. Confidence is not proof.", "C'est une hallucination. L'assurance n'est pas une preuve.", 'Eso es una alucinación. La seguridad no es prueba.', 'यह हैलुसिनेशन है। आत्मविश्वास सबूत नहीं है।', '🌀 🗣️ ≠ ✅'),
    _sk('bunny', 'How do I check it?', 'Comment puis-je vérifier ?', '¿Cómo lo verifico?', 'मैं इसे कैसे जाँचूँ?', '🔎 ❓'),
    _sk('bear', 'Ask for sources, then check a trusted one, like a science site. Spoiler: no cheese.', "Demandez les sources, puis vérifiez-en une fiable, comme un site scientifique. Spoiler : pas de fromage.", 'Pide fuentes y revisa una confiable, como un sitio de ciencia. Spoiler: no hay queso.', 'स्रोत माँगो, फिर किसी भरोसेमंद स्रोत, जैसे विज्ञान साइट, से जाँचो। राज़ की बात: चीज़ नहीं है।', '📚 🔬 🚫🧀', 'cheer'),
  ],
  'power-techniques': [
    _sk('bunny', 'I want the AI to write like a pirate!', "Je veux que l'IA écrive comme un pirate !", '¡Quiero que la IA escriba como un pirata!', 'मैं चाहती हूँ कि AI समुद्री डाकू की तरह लिखे!', '🏴‍☠️ ✍️'),
    _sk('bear', "Show it two examples: 'Ahoy, matey!' and 'Shiver me timbers!'", "Montrez-lui deux exemples : « Ohé, matelot ! » et « Mille sabords ! »", "Muéstrale dos ejemplos: «¡Ahoy, grumete!» y «¡Por mil rayos!»", "उसे दो उदाहरण दिखाओ: 'ओहोय, साथी!' और 'तूफ़ान आ जाए!'", '🦜 🗣️ 🏴‍☠️'),
    _sk('bunny', 'Ahoy! Today ye shall learn about batteries, matey!', "Ohé ! Aujourd'hui, tu vas apprendre les piles, matelot !", '¡Ahoy! ¡Hoy aprenderás sobre baterías, grumete!', 'ओहोय! आज तुम बैटरियों के बारे में सीखोगे, साथी!', '🏴‍☠️ 🔋 😂', 'cheer'),
    _sk('bear', 'Examples, roles and step-by-step thinking: your power tools!', 'Exemples, rôles et raisonnement pas à pas : vos outils de pro !', 'Ejemplos, roles y razonamiento paso a paso: ¡tus herramientas de poder!', 'उदाहरण, भूमिकाएँ और चरण-दर-चरण सोच: आपके शक्तिशाली औज़ार!', '🖼️ 🎭 🪜 💪'),
  ],
  'responsible-ai': [
    _sk('bunny', 'The AI said only bunnies deserve carrots!', "L'IA a dit que seuls les lapins méritent des carottes !", '¡La IA dijo que solo las conejas merecen zanahorias!', 'AI ने कहा कि गाजर सिर्फ़ खरगोशों को मिलनी चाहिए!', '🐰 🥕 🙄', 'oops'),
    _sk('bear', 'It learned from biased data, Pinky. Bears like honey too, you know!', "Elle a appris à partir de données biaisées, Pinky. Les ours aiment aussi le miel, tu sais !", 'Aprendió de datos sesgados, Pinky. ¡A los osos también nos gusta la miel!', 'उसने पक्षपाती डेटा से सीखा है, पिंकी। भालुओं को भी शहद पसंद है, जानती हो!', '🐻 🍯 ⚖️'),
    _sk('bunny', 'So I should check it before I share it?', 'Donc je devrais le vérifier avant de le partager ?', '¿Entonces debo revisarlo antes de compartirlo?', 'तो साझा करने से पहले मुझे इसे जाँचना चाहिए?', '🤔 👀'),
    _sk('bear', 'Yes. You own what you publish: review it, protect data and be fair.', "Oui. Vous êtes responsable de ce que vous publiez : relisez, protégez les données et soyez juste.", 'Sí. Eres responsable de lo que publicas: revisa, protege los datos y sé justa.', 'हाँ। जो तुम प्रकाशित करती हो उसकी ज़िम्मेदारी तुम्हारी है: जाँचो, डेटा बचाओ और निष्पक्ष रहो।', '✅ 🔒 ⚖️', 'cheer'),
  ],
  't-ideas': [
    _sk('bunny', "I'm testing my cookie app. AI, give me test cases!", "Je teste mon appli de biscuits. IA, donne-moi des cas de test !", 'Estoy probando mi app de galletas. ¡IA, dame casos de prueba!', 'मैं अपना कुकी ऐप टेस्ट कर रही हूँ। AI, मुझे टेस्ट केस दो!', '🍪 🧪'),
    _sk('bear', 'Include boundaries: 0 cookies, 1 cookie, 999 cookies, and negative cookies.', 'Incluez les limites : 0 biscuit, 1 biscuit, 999 biscuits, et des biscuits négatifs.', 'Incluye los límites: 0 galletas, 1 galleta, 999 galletas y galletas negativas.', 'सीमाएँ शामिल करो: 0 कुकी, 1 कुकी, 999 कुकी, और ऋणात्मक कुकी।', '0️⃣ 1️⃣ 9️⃣ ➖'),
    _sk('bunny', 'Negative cookies? Silly! But the app crashed!', "Des biscuits négatifs ? Ridicule ! Mais l'appli a planté !", '¿Galletas negativas? ¡Qué tontería! ¡Pero la app se cayó!', 'ऋणात्मक कुकी? कितनी मज़ेदार बात! पर ऐप क्रैश हो गया!', '🍪 ➖ 💥', 'oops'),
    _sk('bear', 'AI suggested it, you ran it, bug found! AI drafts, the tester decides.', "L'IA l'a suggéré, vous l'avez exécuté, bogue trouvé ! L'IA propose, le testeur décide.", '¡La IA lo sugirió, tú lo ejecutaste y encontraste el error! La IA propone, el tester decide.', 'AI ने सुझाया, तुमने चलाया, बग मिल गया! AI मसौदा देता है, टेस्टर फ़ैसला करता है।', '🐞 🔎 ✅', 'cheer'),
  ],
  't-automation': [
    _sk('bunny', 'AI wrote my test script. It has sleep(30000) everywhere!', "L'IA a écrit mon script de test. Il y a sleep(30000) partout !", '¡La IA escribió mi script de prueba. Tiene sleep(30000) por todas partes!', 'AI ने मेरी टेस्ट स्क्रिप्ट लिखी। उसमें हर जगह sleep(30000) है!', '😴 ⏳ 💻', 'oops'),
    _sk('bear', 'Slow and flaky! Use smart waits and stable locators.', 'Lent et instable ! Utilisez des attentes intelligentes et des localisateurs stables.', '¡Lento e inestable! Usa esperas inteligentes y localizadores estables.', 'धीमा और अस्थिर! स्मार्ट वेट और स्थिर लोकेटर इस्तेमाल करो।', '⏳ ❌ ✅ 🎯'),
    _sk('bunny', 'Fixed! Now it runs in 20 seconds instead of 20 minutes.', 'Corrigé ! Maintenant il tourne en 20 secondes au lieu de 20 minutes.', '¡Arreglado! Ahora corre en 20 segundos en vez de 20 minutos.', 'ठीक हो गया! अब यह 20 मिनट की जगह 20 सेकंड में चलता है।', '⚡ 🏃 🎉', 'cheer'),
    _sk('bear', 'Always review AI code, and use fake data, never real customers.', "Relisez toujours le code de l'IA et utilisez de fausses données, jamais de vrais clients.", 'Revisa siempre el código de la IA y usa datos falsos, nunca de clientes reales.', 'AI का कोड हमेशा जाँचो, और नकली डेटा इस्तेमाल करो, असली ग्राहकों का नहीं।', '👀 🧬 🔒'),
  ],
  't-bugs': [
    _sk('bunny', 'My bug note says: "It broke. Sad."', 'Ma note de bogue dit : « Ça a planté. Triste. »', 'Mi nota del error dice: «Se rompió. Triste».', 'मेरे बग नोट में लिखा है: "टूट गया। दुख है।"', '🐞 😢'),
    _sk('bear', 'Paste your notes and logs and ask AI for steps, expected and actual results.', "Collez vos notes et journaux et demandez à l'IA les étapes, le résultat attendu et obtenu.", 'Pega tus notas y logs y pide a la IA pasos, resultado esperado y real.', 'अपने नोट्स और लॉग पेस्ट करो और AI से चरण, अपेक्षित और वास्तविक नतीजे माँगो।', '📜 → 🤖 → 📋'),
    _sk('bunny', 'Wow, it wrote steps! But step 3 is something I never did!', "Waouh, il a écrit des étapes ! Mais l'étape 3, je ne l'ai jamais faite !", '¡Guau, escribió pasos! ¡Pero el paso 3 nunca lo hice!', 'वाह, उसने चरण लिखे! पर चरण 3 तो मैंने कभी किया ही नहीं!', '📋 🤨', 'oops'),
    _sk('bear', 'Right, always verify! AI polishes, you provide the truth.', "Exact, vérifiez toujours ! L'IA peaufine, vous apportez la vérité.", '¡Así es, verifica siempre! La IA pule, tú aportas la verdad.', 'सही, हमेशा जाँचो! AI निखारता है, सच तुम देती हो।', '🕵️ ✅ 🧠', 'cheer'),
  ],
};
