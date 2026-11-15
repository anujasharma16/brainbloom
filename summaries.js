/* "What you learned" takeaways shown after each lesson quiz. Each bullet: [en, fr, es, hi]. */
const SUMMARIES = {
  'what-is-ai': [
    ['AI is software that learns patterns from lots of examples.', "L'IA est un logiciel qui apprend des motifs à partir de nombreux exemples.", 'La IA es un software que aprende patrones a partir de muchos ejemplos.', 'AI ऐसा सॉफ़्टवेयर है जो ढेर सारे उदाहरणों से पैटर्न सीखता है।'],
    ["AI predicts from patterns. It has no feelings and doesn't truly understand like a human.", "L'IA prédit à partir de motifs. Elle n'a pas d'émotions et ne comprend pas vraiment comme un humain.", 'La IA predice a partir de patrones. No tiene sentimientos ni entiende de verdad como un humano.', 'AI पैटर्न से अनुमान लगाता है। उसमें भावनाएँ नहीं हैं और वह इंसान की तरह सच में नहीं समझता।'],
    ['You already use AI daily: spam filters, maps, voice assistants and photo apps.', "Vous utilisez déjà l'IA au quotidien : filtres anti-spam, cartes, assistants vocaux et applis photo.", 'Ya usas la IA a diario: filtros de spam, mapas, asistentes de voz y apps de fotos.', 'आप रोज़ AI इस्तेमाल करते हैं: स्पैम फ़िल्टर, मैप, वॉइस असिस्टेंट और फ़ोटो ऐप।'],
  ],
  'how-ai-learns': [
    ['Training data is the set of examples an AI learns from.', "Les données d'entraînement sont les exemples dont l'IA tire son apprentissage.", 'Los datos de entrenamiento son los ejemplos de los que aprende la IA.', 'ट्रेनिंग डेटा वे उदाहरण हैं जिनसे AI सीखता है।'],
    ['Building AI: collect data, train, test, then use it and keep improving.', "Créer une IA : rassembler les données, entraîner, tester, puis l'utiliser et l'améliorer.", 'Crear una IA: reunir datos, entrenar, probar, y luego usarla y seguir mejorando.', 'AI बनाना: डेटा जुटाएँ, ट्रेन करें, जाँचें, फिर इस्तेमाल करें और सुधारते रहें।'],
    ['Poor or biased data leads to poor or biased answers.', 'Des données médiocres ou biaisées donnent des réponses médiocres ou biaisées.', 'Datos pobres o sesgados producen respuestas pobres o sesgadas.', 'कमज़ोर या पक्षपाती डेटा से कमज़ोर या पक्षपाती जवाब मिलते हैं।'],
  ],
  'first-prompt': [
    ['A prompt is the instruction or question you give the AI.', "Un prompt est la consigne ou la question que vous donnez à l'IA.", 'Un prompt es la instrucción o pregunta que le das a la IA.', 'प्रॉम्प्ट वह निर्देश या सवाल है जो आप AI को देते हैं।'],
    ['Clear prompts (task, tone, length, purpose) get far better answers.', 'Les prompts clairs (tâche, ton, longueur, objectif) donnent de bien meilleures réponses.', 'Los prompts claros (tarea, tono, longitud, objetivo) dan respuestas mucho mejores.', 'साफ़ प्रॉम्प्ट (काम, लहजा, लंबाई, उद्देश्य) से कहीं बेहतर जवाब मिलते हैं।'],
    ['Recipe: task, context, format, then check and refine.', 'Recette : tâche, contexte, format, puis vérifier et affiner.', 'Receta: tarea, contexto, formato y luego revisar y mejorar.', 'नुस्खा: काम, संदर्भ, फ़ॉर्मैट, फिर जाँचें और सुधारें।'],
  ],
  'daily-life': [
    ['AI can help with meals, learning, writing messages and planning trips.', "L'IA peut aider pour les repas, l'apprentissage, la rédaction de messages et les voyages.", 'La IA puede ayudar con comidas, aprendizaje, mensajes y viajes.', 'AI खाने, सीखने, संदेश लिखने और यात्रा की योजना में मदद कर सकता है।'],
    ['Never paste passwords, bank details or private data into a public chatbot.', 'Ne collez jamais mots de passe, données bancaires ou données privées dans un robot public.', 'Nunca pegues contraseñas, datos bancarios ni datos privados en un chatbot público.', 'सार्वजनिक चैटबॉट में कभी पासवर्ड, बैंक विवरण या निजी डेटा पेस्ट न करें।'],
    ['Double-check important answers (health, money, legal) with a trusted source.', "Vérifiez les réponses importantes (santé, argent, droit) auprès d'une source fiable.", 'Verifica las respuestas importantes (salud, dinero, leyes) con una fuente confiable.', 'ज़रूरी जवाबों (स्वास्थ्य, पैसा, कानून) को भरोसेमंद स्रोत से दोबारा जाँचें।'],
  ],
  'better-prompts': [
    ["Add audience and format to shape the answer, for example 'for a teenager, in 5 bullets'.", "Ajoutez le public et le format pour façonner la réponse, par exemple « pour un ado, en 5 puces ».", 'Añade público y formato para dar forma a la respuesta, por ejemplo «para un joven, en 5 viñetas».', "जवाब को आकार देने के लिए श्रोता और फ़ॉर्मैट जोड़ें, जैसे 'किशोर के लिए, 5 बिंदुओं में'।"],
    ['Four ingredients: role, context, task and format.', 'Quatre ingrédients : rôle, contexte, tâche et format.', 'Cuatro ingredientes: rol, contexto, tarea y formato.', 'चार घटक: भूमिका, संदर्भ, काम और फ़ॉर्मैट।'],
    ['If the answer is off, say exactly what to change and try again.', 'Si la réponse ne convient pas, dites précisément quoi changer et réessayez.', 'Si la respuesta no es la esperada, di exactamente qué cambiar e inténtalo de nuevo.', 'अगर जवाब ठीक न हो, तो ठीक-ठीक बताएँ क्या बदलना है और फिर कोशिश करें।'],
  ],
  'check-the-ai': [
    ['A hallucination is a confident answer that is false or made up.', 'Une hallucination est une réponse assurée mais fausse ou inventée.', 'Una alucinación es una respuesta segura pero falsa o inventada.', 'हैलुसिनेशन आत्मविश्वास भरा जवाब है जो गलत या गढ़ा हुआ होता है।'],
    ['A confident tone is not proof. Verify what matters.', "Un ton assuré n'est pas une preuve. Vérifiez ce qui compte.", 'Un tono seguro no es prueba. Verifica lo importante.', 'आत्मविश्वास भरा लहजा सबूत नहीं है। जो मायने रखता है उसे जाँचें।'],
    ['To verify: spot claims, ask for sources, check a trusted source, then correct and use.', "Pour vérifier : repérer les affirmations, demander les sources, consulter une source fiable, puis corriger et utiliser.", 'Para verificar: identifica afirmaciones, pide fuentes, consulta una fuente confiable, corrige y usa.', 'जाँच के लिए: दावे पहचानें, स्रोत पूछें, भरोसेमंद स्रोत देखें, फिर सुधारें और इस्तेमाल करें।'],
  ],
  'power-techniques': [
    ['Few-shot prompting: show 2-3 examples of the style you want.', 'Prompt avec exemples : montrez 2-3 exemples du style voulu.', 'Prompt con ejemplos: muestra 2-3 ejemplos del estilo que quieres.', 'फ़्यू-शॉट प्रॉम्प्टिंग: मनचाही शैली के 2-3 उदाहरण दिखाएँ।'],
    ['Ask the AI to think step by step for tricky problems.', "Demandez à l'IA de raisonner pas à pas pour les problèmes délicats.", 'Pide a la IA que piense paso a paso en los problemas complicados.', 'कठिन समस्याओं में AI से चरण-दर-चरण सोचने को कहें।'],
    ['Roles and constraints (word count, tone) steer the output.', 'Les rôles et les contraintes (nombre de mots, ton) orientent le résultat.', 'Los roles y las restricciones (palabras, tono) guían el resultado.', 'भूमिका और सीमाएँ (शब्द-संख्या, लहजा) नतीजे को दिशा देती हैं।'],
  ],
  'responsible-ai': [
    ['AI can be biased because it learns from human data that may contain bias.', "L'IA peut être biaisée car elle apprend de données humaines qui peuvent contenir des biais.", 'La IA puede tener sesgos porque aprende de datos humanos que pueden tenerlos.', 'AI में पक्षपात हो सकता है क्योंकि वह इंसानी डेटा से सीखता है जिसमें पक्षपात हो सकता है।'],
    ['You are responsible for what you publish, even if AI helped.', "Vous êtes responsable de ce que vous publiez, même si l'IA a aidé.", 'Eres responsable de lo que publicas, aunque la IA haya ayudado.', 'आप जो प्रकाशित करते हैं उसके ज़िम्मेदार आप हैं, भले ही AI ने मदद की हो।'],
    ['At work: follow policy, protect private data and review outputs.', 'Au travail : suivez la politique, protégez les données privées et relisez les résultats.', 'En el trabajo: sigue la política, protege los datos privados y revisa los resultados.', 'काम पर: नीति मानें, निजी डेटा बचाएँ और नतीजे जाँचें।'],
  ],
  't-ideas': [
    ['Prompt with the user story and acceptance criteria, and ask for positive, negative and edge cases.', "Fournissez le récit utilisateur et les critères d'acceptation, et demandez des cas positifs, négatifs et limites.", 'Incluye la historia de usuario y los criterios de aceptación, y pide casos positivos, negativos y de borde.', 'यूज़र स्टोरी और स्वीकृति मानदंड दें, और सकारात्मक, नकारात्मक और एज केस माँगें।'],
    ['AI can suggest boundary values, equivalence classes, negative inputs and exploratory charters.', "L'IA peut suggérer valeurs limites, classes d'équivalence, entrées négatives et chartes exploratoires.", 'La IA puede sugerir valores límite, clases de equivalencia, entradas negativas y cartas exploratorias.', 'AI सीमा मान, समतुल्य वर्ग, नकारात्मक इनपुट और एक्सप्लोरेटरी चार्टर सुझा सकता है।'],
    ['AI drafts, the tester reviews: check for missed business rules.', "L'IA propose, le testeur relit : vérifiez les règles métier oubliées.", 'La IA propone, el tester revisa: busca reglas de negocio omitidas.', 'AI मसौदा देता है, टेस्टर जाँचता है: छूटे बिज़नेस नियम देखें।'],
  ],
  't-automation': [
    ['Safe workflow: describe, generate, review, run locally, then commit.', 'Flux sûr : décrire, générer, relire, exécuter localement, puis valider.', 'Flujo seguro: describir, generar, revisar, ejecutar localmente y subir.', 'सुरक्षित कार्यप्रवाह: बताएँ, बनवाएँ, जाँचें, स्थानीय रूप से चलाएँ, फिर जमा करें।'],
    ['Fix flaky AI code: use proper waits and stable locators, not fixed sleeps.', "Corrigez le code instable de l'IA : vraies attentes et localisateurs stables, pas de pauses fixes.", 'Corrige el código inestable de la IA: esperas adecuadas y localizadores estables, no pausas fijas.', 'AI के अस्थिर कोड को सुधारें: सही वेट और स्थिर लोकेटर, तय प्रतीक्षाएँ नहीं।'],
    ['Never paste real customer data into public AI tools; use synthetic or masked data.', "Ne collez jamais de vraies données clients dans des outils d'IA publics ; utilisez des données synthétiques ou masquées.", 'Nunca pegues datos reales de clientes en IA públicas; usa datos sintéticos o enmascarados.', 'सार्वजनिक AI टूल में असली ग्राहक डेटा कभी पेस्ट न करें; सिंथेटिक या मास्क किया डेटा इस्तेमाल करें।'],
  ],
  't-bugs': [
    ['AI can turn notes and logs into a clear bug report; you supply and verify the facts.', "L'IA peut transformer notes et journaux en rapport de bogue clair ; vous fournissez et vérifiez les faits.", 'La IA puede convertir notas y logs en un reporte claro; tú aportas y verificas los hechos.', 'AI नोट्स और लॉग को साफ़ बग रिपोर्ट में बदल सकता है; तथ्य आप देते और जाँचते हैं।'],
    ['It also helps with test data, log summaries, test reports and coverage gaps.', "Elle aide aussi pour les données de test, résumés de journaux, rapports de test et lacunes de couverture.", 'También ayuda con datos de prueba, resúmenes de logs, informes de pruebas y huecos de cobertura.', 'वह टेस्ट डेटा, लॉग सार, टेस्ट रिपोर्ट और कवरेज की कमियों में भी मदद करता है।'],
    ["AI amplifies a good tester; it doesn't replace judgment or test strategy.", "L'IA amplifie un bon testeur ; elle ne remplace ni le jugement ni la stratégie de test.", 'La IA potencia a un buen tester; no reemplaza el criterio ni la estrategia de pruebas.', 'AI अच्छे टेस्टर को सशक्त बनाता है; विवेक या टेस्ट रणनीति की जगह नहीं लेता।'],
  ],
};

/* summaryFor('what-is-ai') -> array of bullet strings in the current language */
function summaryFor(id) {
  const i = { en: 0, fr: 1, es: 2, hi: 3, zh: 4 }[LANG.current] ?? 0;
  return (SUMMARIES[id] || []).map((b) => b[i] || b[0]);
}
