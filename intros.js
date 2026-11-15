/* Story intros shown before each lesson. Bruno (bear) teaches, Pinky (bunny) asks.
   Scene format: [speaker, en, fr, es, hi, visual]. The visual is space-separated emoji that pop in one by one. */
const _sc = (who, en, fr, es, hi, v) => ({ who, text: { en, fr, es, hi }, v: v.split(' ') });

const INTROS = {
  'what-is-ai': [
    _sc('bear', "Hi, I'm Bruno! AI is software that learns patterns from lots of examples.", "Salut, je suis Bruno ! L'IA est un logiciel qui apprend des motifs à partir de nombreux exemples.", '¡Hola, soy Bruno! La IA es un software que aprende patrones a partir de muchos ejemplos.', 'नमस्ते, मैं ब्रूनो हूँ! AI ऐसा सॉफ़्टवेयर है जो ढेर सारे उदाहरणों से पैटर्न सीखता है।', '📚 → 🧠 → 💡'),
    _sc('bunny', "I'm Pinky! So is AI a robot with feelings?", "Moi, c'est Pinky ! Donc l'IA, c'est un robot avec des émotions ?", '¡Soy Pinky! ¿Entonces la IA es un robot con sentimientos?', 'मैं पिंकी हूँ! तो क्या AI भावनाओं वाला रोबोट है?', '🤖 ❓ 💖'),
    _sc('bear', 'Nope! It predicts from patterns. You already use it: spam filters, maps, voice assistants and photo apps.', "Non ! Elle prédit à partir de motifs. Vous l'utilisez déjà : filtres anti-spam, cartes, assistants vocaux et applis photo.", '¡No! Predice a partir de patrones. Ya la usas: filtros de spam, mapas, asistentes de voz y apps de fotos.', 'नहीं! वह पैटर्न से अनुमान लगाता है। आप इसे पहले से इस्तेमाल करते हैं: स्पैम फ़िल्टर, मैप, वॉइस असिस्टेंट और फ़ोटो ऐप।', '📧 🗺️ 🎙️ 📷'),
  ],
  'how-ai-learns': [
    _sc('bunny', 'How does AI learn, Bruno?', "Comment l'IA apprend-elle, Bruno ?", '¿Cómo aprende la IA, Bruno?', 'ब्रूनो, AI कैसे सीखता है?', '🤔 🧠'),
    _sc('bear', 'Like you learn fruit names: by seeing many examples. Those examples are called training data.', "Comme vous apprenez les noms des fruits : en voyant beaucoup d'exemples. On les appelle données d'entraînement.", 'Como aprendes los nombres de las frutas: viendo muchos ejemplos. Se llaman datos de entrenamiento.', 'जैसे आप फलों के नाम सीखते हैं: बहुत से उदाहरण देखकर। इन्हें ट्रेनिंग डेटा कहते हैं।', '🍎 🍌 🍇 → 🧠'),
    _sc('bear', 'Steps: collect data, train, test, then use it. Bad data means bad answers!', 'Étapes : rassembler les données, entraîner, tester, puis utiliser. De mauvaises données donnent de mauvaises réponses !', 'Pasos: reunir datos, entrenar, probar y usar. ¡Datos malos, respuestas malas!', 'चरण: डेटा जुटाएँ, ट्रेन करें, जाँचें, फिर इस्तेमाल करें। खराब डेटा यानी खराब जवाब!', '🗂️ → 🏋️ → ✅ → 🚀'),
  ],
  'first-prompt': [
    _sc('bunny', 'What do I type to talk to AI?', "Que dois-je écrire pour parler à l'IA ?", '¿Qué escribo para hablar con la IA?', 'AI से बात करने के लिए मैं क्या लिखूँ?', '⌨️ 💬'),
    _sc('bear', "That's a prompt: the instruction you give. Clear prompts get better answers.", "C'est un prompt : la consigne que vous donnez. Un prompt clair donne de meilleures réponses.", 'Eso es un prompt: la instrucción que das. Un prompt claro da mejores respuestas.', 'इसे प्रॉम्प्ट कहते हैं: वह निर्देश जो आप देते हैं। साफ़ प्रॉम्प्ट से बेहतर जवाब मिलते हैं।', '💬 → 🤖 → ✨'),
    _sc('bear', 'Recipe: say the task, add context, ask for a format, then refine.', 'Recette : dites la tâche, ajoutez le contexte, demandez un format, puis affinez.', 'Receta: di la tarea, añade contexto, pide un formato y luego mejora.', 'नुस्खा: काम बताएँ, संदर्भ जोड़ें, फ़ॉर्मैट माँगें, फिर सुधारें।', '🎯 → 📝 → 📋 → 🔁'),
  ],
  'daily-life': [
    _sc('bunny', 'Can AI help me at home?', "L'IA peut-elle m'aider à la maison ?", '¿Puede la IA ayudarme en casa?', 'क्या AI घर पर मेरी मदद कर सकता है?', '🏠 🤖'),
    _sc('bear', 'Sure! Meal ideas, learning topics, drafting messages, planning trips.', 'Bien sûr ! Idées de repas, apprendre un sujet, rédiger des messages, préparer des voyages.', '¡Claro! Ideas de comidas, aprender temas, redactar mensajes, planear viajes.', 'बिल्कुल! खाने के विचार, नई चीज़ें सीखना, संदेश लिखना, यात्रा की योजना।', '🍲 📖 ✉️ ✈️'),
    _sc('bear', 'But never share passwords or private data, and double-check important answers.', 'Mais ne partagez jamais mots de passe ni données privées, et vérifiez les réponses importantes.', 'Pero nunca compartas contraseñas ni datos privados, y verifica las respuestas importantes.', 'पर कभी पासवर्ड या निजी डेटा साझा न करें, और ज़रूरी जवाब दोबारा जाँचें।', '🔒 🚫 🔍'),
  ],
  'better-prompts': [
    _sc('bunny', 'My answers are boring. Help!', 'Mes réponses sont ennuyeuses. Au secours !', 'Mis respuestas son aburridas. ¡Ayuda!', 'मेरे जवाब फीके हैं। मदद करो!', '😴 💬'),
    _sc('bear', 'Add four ingredients: role, context, task and format.', 'Ajoutez quatre ingrédients : rôle, contexte, tâche et format.', 'Añade cuatro ingredientes: rol, contexto, tarea y formato.', 'चार चीज़ें जोड़ें: भूमिका, संदर्भ, काम और फ़ॉर्मैट।', '🎭 🌍 🎯 📋'),
    _sc('bear', "Not perfect? Don't give up. Tell the AI what to change and try again.", "Pas parfait ? N'abandonnez pas. Dites à l'IA quoi changer et réessayez.", '¿No es perfecto? No te rindas. Dile a la IA qué cambiar e inténtalo de nuevo.', 'ठीक नहीं बना? हार न मानें। AI को बताएँ क्या बदलना है और फिर कोशिश करें।', '💬 → 🔧 → 🔁'),
  ],
  'check-the-ai': [
    _sc('bunny', 'The AI sounded so sure, but it was wrong!', "L'IA semblait si sûre, mais elle avait tort !", '¡La IA sonaba tan segura, pero se equivocó!', 'AI बहुत आश्वस्त लग रहा था, पर वह गलत था!', '😎 ❌'),
    _sc('bear', "That's a hallucination: a confident answer that is made up. Confidence is not proof.", "C'est une hallucination : une réponse assurée mais inventée. L'assurance n'est pas une preuve.", 'Eso es una alucinación: una respuesta segura pero inventada. La seguridad no es prueba.', 'इसे हैलुसिनेशन कहते हैं: आत्मविश्वास भरा पर गढ़ा हुआ जवाब। आत्मविश्वास सबूत नहीं है।', '🌀 🗣️ ≠ ✅'),
    _sc('bear', 'So: spot the claims, ask for sources, verify with a trusted source, then use.', "Alors : repérez les affirmations, demandez les sources, vérifiez auprès d'une source fiable, puis utilisez.", 'Entonces: identifica las afirmaciones, pide fuentes, verifica con una fuente confiable y luego usa.', 'तो: दावे पहचानें, स्रोत पूछें, भरोसेमंद स्रोत से पुष्टि करें, फिर इस्तेमाल करें।', '🔎 → 📚 → ✅'),
  ],
  'power-techniques': [
    _sc('bunny', 'I am ready for pro tricks!', 'Je suis prête pour les astuces de pro !', '¡Estoy lista para los trucos de pro!', 'मैं प्रो ट्रिक्स के लिए तैयार हूँ!', '🚀 ⚡'),
    _sc('bear', 'Show examples, ask for step-by-step thinking, give a role, and set limits.', 'Montrez des exemples, demandez un raisonnement pas à pas, donnez un rôle et fixez des limites.', 'Muestra ejemplos, pide razonar paso a paso, asigna un rol y fija límites.', 'उदाहरण दिखाएँ, चरण-दर-चरण सोचने को कहें, भूमिका दें और सीमाएँ तय करें।', '🖼️ 🪜 🎭 📏'),
    _sc('bunny', 'Examples teach the style faster than any description!', "Les exemples enseignent le style plus vite que n'importe quelle description !", '¡Los ejemplos enseñan el estilo más rápido que cualquier descripción!', 'उदाहरण किसी भी वर्णन से तेज़ शैली सिखाते हैं!', '✍️ → 🎨'),
  ],
  'responsible-ai': [
    _sc('bear', 'With great power comes great responsibility.', 'Un grand pouvoir implique de grandes responsabilités.', 'Un gran poder conlleva una gran responsabilidad.', 'बड़ी शक्ति के साथ बड़ी ज़िम्मेदारी आती है।', '💪 ⚖️'),
    _sc('bunny', 'Why can AI be unfair?', "Pourquoi l'IA peut-elle être injuste ?", '¿Por qué puede ser injusta la IA?', 'AI अन्यायपूर्ण क्यों हो सकता है?', '🤨 ⚖️'),
    _sc('bear', 'It learns from human data, which can hold bias. You own what you publish: follow policy, protect data, review outputs.', 'Elle apprend de données humaines, qui peuvent contenir des biais. Vous êtes responsable de ce que vous publiez : suivez la politique, protégez les données, relisez.', 'Aprende de datos humanos, que pueden tener sesgos. Eres responsable de lo que publicas: sigue la política, protege los datos y revisa.', 'वह इंसानी डेटा से सीखता है, जिसमें पक्षपात हो सकता है। जो आप प्रकाशित करें उसकी ज़िम्मेदारी आपकी है: नीति मानें, डेटा बचाएँ, जाँचें।', '📊 → ⚠️ 👤 ✅'),
  ],
  't-ideas': [
    _sc('bunny', "I'm a tester. Can AI help me find test ideas?", "Je suis testeuse. L'IA peut-elle m'aider à trouver des idées de tests ?", 'Soy tester. ¿Puede la IA ayudarme con ideas de pruebas?', 'मैं टेस्टर हूँ। क्या AI टेस्ट आइडिया खोजने में मदद कर सकता है?', '🧪 💡'),
    _sc('bear', 'Yes! Give it the user story and acceptance criteria, then ask for positive, negative and edge cases.', "Oui ! Donnez-lui le récit utilisateur et les critères d'acceptation, puis demandez des cas positifs, négatifs et limites.", '¡Sí! Dale la historia de usuario y los criterios de aceptación y pide casos positivos, negativos y de borde.', 'हाँ! उसे यूज़र स्टोरी और स्वीकृति मानदंड दें, फिर सकारात्मक, नकारात्मक और एज केस माँगें।', '📄 → 🤖 → ✅ ❌ 🔬'),
    _sc('bear', 'AI drafts, you decide. Always review for missed business rules.', "L'IA propose, vous décidez. Relisez toujours pour repérer les règles métier oubliées.", 'La IA propone, tú decides. Revisa siempre por reglas de negocio omitidas.', 'AI मसौदा देता है, फ़ैसला आपका। छूटे बिज़नेस नियमों के लिए हमेशा जाँचें।', '🤖 ✍️ → 🧑‍💻 ✔️'),
  ],
  't-automation': [
    _sc('bunny', 'Can AI write my automation scripts?', "L'IA peut-elle écrire mes scripts d'automatisation ?", '¿Puede la IA escribir mis scripts de automatización?', 'क्या AI मेरी ऑटोमेशन स्क्रिप्ट लिख सकता है?', '⚙️ 💻'),
    _sc('bear', 'It can draft them. Describe the scenario and framework, generate, review, run locally, then commit.', 'Elle peut les ébaucher. Décrivez le scénario et le cadre, générez, relisez, exécutez localement, puis validez.', 'Puede redactarlos. Describe el escenario y el framework, genera, revisa, ejecuta localmente y sube.', 'वह मसौदा बना सकता है। परिदृश्य और फ़्रेमवर्क बताएँ, बनवाएँ, जाँचें, स्थानीय रूप से चलाएँ, फिर जमा करें।', '📝 → 🤖 → 👀 → ▶️ → 📦'),
    _sc('bear', 'Watch for flaky waits, and never paste real customer data. Use synthetic data.', 'Attention aux attentes instables, et ne collez jamais de vraies données clients. Utilisez des données synthétiques.', 'Cuidado con las esperas inestables y nunca pegues datos reales de clientes. Usa datos sintéticos.', 'अस्थिर प्रतीक्षाओं से सावधान रहें और असली ग्राहक डेटा कभी पेस्ट न करें। सिंथेटिक डेटा इस्तेमाल करें।', '⏳ ⚠️ 🔒 🧬'),
  ],
  't-bugs': [
    _sc('bunny', 'Writing bug reports takes forever.', 'Rédiger des rapports de bogues prend un temps fou.', 'Escribir reportes de errores lleva una eternidad.', 'बग रिपोर्ट लिखने में बहुत समय लगता है।', '🐞 😩'),
    _sc('bear', 'AI can turn your notes and logs into a clear report with steps, expected and actual results.', "L'IA peut transformer vos notes et journaux en rapport clair avec étapes, résultat attendu et obtenu.", 'La IA puede convertir tus notas y logs en un reporte claro con pasos, resultado esperado y real.', 'AI आपके नोट्स और लॉग को चरण, अपेक्षित और वास्तविक नतीजे वाली साफ़ रिपोर्ट में बदल सकता है।', '🗒️ 📜 → 🤖 → 📋'),
    _sc('bear', 'It also helps with test data, log summaries and coverage gaps. It speeds you up; your judgment stays.', "Elle aide aussi pour les données de test, les résumés de journaux et les lacunes de couverture. Elle vous accélère ; le jugement reste le vôtre.", 'También ayuda con datos de prueba, resúmenes de logs y huecos de cobertura. Te acelera; el criterio sigue siendo tuyo.', 'वह टेस्ट डेटा, लॉग सार और कवरेज की कमियों में भी मदद करता है। वह आपको तेज़ बनाता है; विवेक आपका रहता है।', '🧬 📊 🕳️ 🧠'),
  ],
};
