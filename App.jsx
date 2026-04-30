import { useState } from "react";

const LOGO_B64 = null; // logo loaded from /logo.svg
const TAG_CONFIG = {"FAZER":{"cor":"#166534","bg":"#dcfce7","borda":"#86efac"},"EVITAR":{"cor":"#991b1b","bg":"#fee2e2","borda":"#fca5a5"},"PROIBIDO":{"cor":"#991b1b","bg":"#fee2e2","borda":"#fca5a5"},"ATENÇÃO":{"cor":"#92400e","bg":"#fef9c3","borda":"#fde047"},"CAUTELA":{"cor":"#92400e","bg":"#fef9c3","borda":"#fde047"},"EMERGÊNCIA":{"cor":"#7f1d1d","bg":"#fee2e2","borda":"#ef4444"},"META":{"cor":"#1e3a5f","bg":"#f0f9ff","borda":"#7dd3fc"},"EVIDÊNCIA":{"cor":"#374151","bg":"#f9fafb","borda":"#d1d5db"}};
const GUIAS_INICIAIS = [{"id":"cirrose-descomp","nome":"Cirrose Descompensada","subtitulo":"Child-Pugh B/C · EASL/AASLD 2018-2024","secoes":[{"id":"cd-s1","nome":"Nutrição e Dieta","itens":[{"id":"cd-i1","tag":"FAZER","texto":"Fracionar em 6 refeições pequenas ao dia — saciedade precoce pela compressão da ascite"},{"id":"cd-i2","tag":"FAZER","texto":"Lanche noturno tardio obrigatório (carboidrato complexo + proteína) para reduzir catabolismo muscular"},{"id":"cd-i3","tag":"FAZER","texto":"Proteína 1,2–1,5 g/kg/dia — não restringir mesmo na encefalopatia; priorizar proteína vegetal e laticínios"},{"id":"cd-i4","tag":"PROIBIDO","texto":"Sódio < 2 g/dia — evitar qualquer alimento industrializado, enlatado, embutido ou tempero pronto"},{"id":"cd-i5","tag":"EVITAR","texto":"Alimentos ultraprocessados, fast food, salgadinhos, molhos prontos e conservas"},{"id":"cd-i6","tag":"PROIBIDO","texto":"Frutos do mar crus — risco grave e letal de Vibrio vulnificus"},{"id":"cd-i7","tag":"ATENÇÃO","texto":"Pesar-se diariamente — ganho de >1 kg/dia ou >2 kg/semana: comunicar ao médico"},{"id":"cd-i8","tag":"ATENÇÃO","texto":"Aumentar fibras e evitar constipação — intestino preso eleva amônia e piora confusão mental"}]},{"id":"cd-s2","nome":"Atividade Física","itens":[{"id":"cd-i9","tag":"FAZER","texto":"Aeróbico leve a moderado — caminhada, hidroginástica — conforme tolerância"},{"id":"cd-i10","tag":"FAZER","texto":"Musculação leve 2–3×/semana, supervisionada — combate à sarcopenia"},{"id":"cd-i11","tag":"PROIBIDO","texto":"Exercícios de alta intensidade, esforço brusco ou Valsalva — risco de ruptura de varizes"},{"id":"cd-i12","tag":"SUSPENDER","texto":"Toda atividade durante sangramento, infecção ativa, encefalopatia ou ascite volumosa não controlada"},{"id":"cd-i13","tag":"ATENÇÃO","texto":"Interromper se surgir tontura, falta de ar, dor abdominal ou fraqueza intensa"}]},{"id":"cd-s3","nome":"Medicamentos e Suplementos","itens":[{"id":"cd-i14","tag":"PROIBIDO","texto":"AINEs (ibuprofeno, diclofenaco, naproxeno) — contraindicados; aumentam risco renal e de sangramento"},{"id":"cd-i15","tag":"CAUTELA","texto":"Paracetamol: máximo 2 g/dia — evitar em doença hepática alcoólica ativa"},{"id":"cd-i16","tag":"PROIBIDO","texto":"Fitoterápicos, chás medicinais e suplementos sem avaliação médica — hepatotoxicidade grave"},{"id":"cd-i17","tag":"ATENÇÃO","texto":"Qualquer medicamento novo — incluindo vitaminas — comunicar ao hepatologista antes de iniciar"},{"id":"cd-i18","tag":"FAZER","texto":"Diuréticos: tomar nos horários prescritos; não alterar a dose — relatar cãibras, fraqueza ou tontura"},{"id":"cd-i19","tag":"FAZER","texto":"Lactulose: manter 2–3 evacuações amolecidas/dia — ajustar dose até atingir esse alvo"}]},{"id":"cd-s4","nome":"Álcool e Hepatotoxinas","itens":[{"id":"cd-i20","tag":"PROIBIDO","texto":"Álcool em qualquer quantidade — abstinência total e permanente; qualquer dose acelera a descompensação"},{"id":"cd-i21","tag":"PROIBIDO","texto":"Drogas recreativas (cocaína, ecstasy, anfetaminas) — hepatotóxicas e precipitantes de encefalopatia"},{"id":"cd-i22","tag":"PROIBIDO","texto":"Cogumelos silvestres — especialmente Amanita phalloides"},{"id":"cd-i23","tag":"EVIDÊNCIA","texto":"A abstinência alcoólica pode levar à recompensação — mesmo em estágios avançados"}]},{"id":"cd-s5","nome":"Sinais de Alerta — Procure Emergência","itens":[{"id":"cd-i24","tag":"EMERGÊNCIA","texto":"Vômito com sangue ou fezes negras/escuras (hemorragia por varizes)"},{"id":"cd-i25","tag":"EMERGÊNCIA","texto":"Barriga aumentando rapidamente ou dor abdominal intensa com ascite"},{"id":"cd-i26","tag":"EMERGÊNCIA","texto":"Confusão mental, sonolência excessiva ou desorientação (encefalopatia)"},{"id":"cd-i27","tag":"EMERGÊNCIA","texto":"Febre — mesmo que baixa — com ascite presente (suspeita de PBE)"},{"id":"cd-i28","tag":"EMERGÊNCIA","texto":"Icterícia progressiva (amarelamento da pele e olhos)"},{"id":"cd-i29","tag":"EMERGÊNCIA","texto":"Diminuição acentuada do volume urinário (síndrome hepatorrenal)"},{"id":"cd-i30","tag":"EMERGÊNCIA","texto":"Ganho de peso >1 kg em 1 dia ou >2 kg em 1 semana"}]},{"id":"cd-s6","nome":"Orientações por Complicação","itens":[{"id":"cd-i31","tag":"ASCITE","texto":"Pesar-se todo dia pela manhã, em jejum e após urinar"},{"id":"cd-i32","tag":"ASCITE","texto":"Ganho >1 kg/dia ou >2 kg/semana: comunicar médico imediatamente"},{"id":"cd-i33","tag":"ASCITE","texto":"Diuréticos diariamente — não suspender por conta própria"},{"id":"cd-i34","tag":"ASCITE","texto":"Restrição de sódio <2 g/dia é essencial no tratamento da ascite"},{"id":"cd-i35","tag":"ASCITE","texto":"Se prescrita paracentese de repetição: comparecer regularmente às consultas"},{"id":"cd-i36","tag":"ENCEFAL.","texto":"Lactulose diariamente — meta: 2 a 3 evacuações amolecidas/dia"},{"id":"cd-i37","tag":"ENCEFAL.","texto":"Nunca restringir proteína — aumenta sarcopenia e piora o prognóstico"},{"id":"cd-i38","tag":"ENCEFAL.","texto":"Evitar constipação, infecções, desidratação e uso de sedativos/benzodiazepínicos"},{"id":"cd-i39","tag":"ENCEFAL.","texto":"Alertar familiares: confusão mental e desorientação são sinais de encefalopatia — emergência"},{"id":"cd-i40","tag":"ENCEFAL.","texto":"Se em uso de rifaximina: não interromper sem orientação médica"},{"id":"cd-i41","tag":"VARIZES","texto":"Tomar betabloqueador (propranolol ou carvedilol) conforme prescrito — não suspender"},{"id":"cd-i42","tag":"VARIZES","texto":"Endoscopia digestiva alta de rastreio nos prazos indicados"},{"id":"cd-i43","tag":"VARIZES","texto":"Evitar esforço físico intenso e manobra de Valsalva"},{"id":"cd-i44","tag":"VARIZES","texto":"Vômito com sangue ou fezes negras: emergência imediata"},{"id":"cd-i45","tag":"PBE","texto":"Se prescrita profilaxia com norfloxacino: tomar diariamente sem interromper"},{"id":"cd-i46","tag":"PBE","texto":"Higiene rigorosa das mãos; evitar alimentos malcozidos e água não tratada"},{"id":"cd-i47","tag":"PBE","texto":"Febre, dor abdominal ou piora da confusão com ascite: emergência — suspeita de PBE"},{"id":"cd-i48","tag":"PBE","texto":"Recorrência da PBE em 1 ano é aproximadamente 70% — manter profilaxia"}]}]},{"id":"cirrose-comp","nome":"Cirrose Compensada","subtitulo":"Child-Pugh A · EASL/AASLD 2023-2025","secoes":[{"id":"cc-s1","nome":"Nutrição e Dieta","itens":[{"id":"cc-i1","tag":"FAZER","texto":"Fracionar em 5–6 refeições pequenas ao dia"},{"id":"cc-i2","tag":"FAZER","texto":"Lanche noturno tardio (carboidrato complexo + proteína) para evitar catabolismo muscular"},{"id":"cc-i3","tag":"FAZER","texto":"Proteína 1,2–1,5 g/kg/dia — priorizar proteína vegetal, laticínios e peixe"},{"id":"cc-i4","tag":"FAZER","texto":"Gorduras saudáveis: azeite de oliva extra virgem, peixes de águas frias, chia, linhaça, nozes"},{"id":"cc-i5","tag":"FAZER","texto":"Fibras 25–35 g/dia: aveia, feijão, lentilha, frutas, vegetais com casca"},{"id":"cc-i6","tag":"EVITAR","texto":"Sal em excesso — máximo 2 g/dia de sódio (~5 g de sal de cozinha)"},{"id":"cc-i7","tag":"EVITAR","texto":"Alimentos ultraprocessados, embutidos, enlatados e fast food"},{"id":"cc-i8","tag":"EVITAR","texto":"Açúcar em excesso: refrigerantes, sucos industrializados, doces"},{"id":"cc-i9","tag":"ATENÇÃO","texto":"Frutos do mar crus são proibidos — risco grave de Vibrio vulnificus"}]},{"id":"cc-s2","nome":"Atividade Física","itens":[{"id":"cc-i10","tag":"FAZER","texto":"150 min/semana de aeróbico moderado: caminhada, natação, hidroginástica, ciclismo plano"},{"id":"cc-i11","tag":"FAZER","texto":"Musculação 2–3×/semana com carga progressiva — essencial para prevenção de sarcopenia"},{"id":"cc-i12","tag":"ATENÇÃO","texto":"Se houver varizes esofágicas não tratadas: evitar manobra de Valsalva"},{"id":"cc-i13","tag":"META","texto":"Redução de ≥10% do peso melhora a fibrose hepática em cirrose por MASH/NASH"}]},{"id":"cc-s3","nome":"Medicamentos e Suplementos","itens":[{"id":"cc-i14","tag":"PROIBIDO","texto":"AINEs (ibuprofeno, diclofenaco, naproxeno) — risco de lesão renal e sangramento"},{"id":"cc-i15","tag":"CAUTELA","texto":"Paracetamol: máximo 2 g/dia — evitar em doença hepática alcoólica ativa"},{"id":"cc-i16","tag":"PROIBIDO","texto":"Fitoterápicos, chás medicinais e suplementos sem avaliação médica — risco de hepatotoxicidade"},{"id":"cc-i17","tag":"ATENÇÃO","texto":"Qualquer medicamento novo — incluindo vitaminas — deve ser comunicado ao hepatologista"}]},{"id":"cc-s4","nome":"Álcool e Hepatotoxinas","itens":[{"id":"cc-i18","tag":"PROIBIDO","texto":"Álcool em qualquer quantidade — abstinência total e permanente, independente da etiologia"},{"id":"cc-i19","tag":"EVITAR","texto":"Cogumelos silvestres (especialmente Amanita phalloides)"},{"id":"cc-i20","tag":"EVITAR","texto":"Drogas recreativas (cocaína, ecstasy, anfetaminas)"},{"id":"cc-i21","tag":"EVIDÊNCIA","texto":"A abstinência alcoólica pode levar à recompensação da cirrose — mesmo em estágios avançados"}]},{"id":"cc-s5","nome":"Sinais de Alerta — Procure Emergência","itens":[{"id":"cc-i22","tag":"EMERGÊNCIA","texto":"Vômito com sangue ou fezes negras/escuras (hemorragia por varizes)"},{"id":"cc-i23","tag":"EMERGÊNCIA","texto":"Barriga aumentando rapidamente (ascite nova ou progressiva)"},{"id":"cc-i24","tag":"EMERGÊNCIA","texto":"Confusão mental, sonolência excessiva ou mudança de comportamento (encefalopatia)"},{"id":"cc-i25","tag":"EMERGÊNCIA","texto":"Icterícia progressiva (amarelamento da pele e olhos)"},{"id":"cc-i26","tag":"EMERGÊNCIA","texto":"Febre sem causa aparente — suspeita de peritonite bacteriana espontânea"},{"id":"cc-i27","tag":"EMERGÊNCIA","texto":"Diminuição acentuada do volume urinário (síndrome hepatorrenal)"}]}]},{"id":"retorno","nome":"Orientações de Retorno","subtitulo":"Orientações gerais para todos os pacientes","secoes":[{"id":"ret-s1","nome":"Orientações Gerais","itens":[{"id":"ret-i1","tag":"FAZER","texto":"Prevenção é o melhor remédio — cuide da saúde mesmo quando está se sentindo bem"},{"id":"ret-i2","tag":"ATENÇÃO","texto":"Muitas doenças do fígado não causam sintomas no início — consultas e exames regulares são essenciais"},{"id":"ret-i3","tag":"PROIBIDO","texto":"Não se automedique — anti-inflamatórios (ibuprofeno e nimesulida) prejudicam o fígado e os rins mesmo em doses comuns"}]},{"id":"ret-s2","nome":"Hidratação","itens":[{"id":"ret-i4","tag":"FAZER","texto":"Beba água todos os dias — quantidade ideal: 35 ml × seu peso (kg) = meta diária"},{"id":"ret-i5","tag":"FAZER","texto":"Exemplo: 70 kg → 2,45 litros por dia"}]},{"id":"ret-s3","nome":"Alimentação e Atividade Física","itens":[{"id":"ret-i6","tag":"FAZER","texto":"Prefira frutas, verduras, legumes e carnes magras (frango sem pele, peixe)"},{"id":"ret-i7","tag":"EVITAR","texto":"Reduza carboidratos refinados como pão branco, cuscuz e massas — sobrecarregam o fígado em excesso"},{"id":"ret-i8","tag":"FAZER","texto":"150 min/semana de aeróbico (caminhada, natação, bike)"},{"id":"ret-i9","tag":"FAZER","texto":"2–3× por semana de resistência (musculação, pilates)"},{"id":"ret-i10","tag":"FAZER","texto":"Mantenha vacinação em dia — algumas hepatites são evitáveis com vacinas"}]},{"id":"ret-s4","nome":"Atenção — Chás e Plantas Medicinais","itens":[{"id":"ret-i11","tag":"ATENÇÃO","texto":"Nem todo chá faz bem ao fígado — algumas ervas podem ser tóxicas em uso prolongado ou doses elevadas"},{"id":"ret-i12","tag":"EVITAR","texto":"Cúrcuma, Carqueja, Maca Peruana, Hibisco, Espinheira Santa, Sene, Cavalinha, Chá Verde, Chá Preto, Amora"},{"id":"ret-i13","tag":"ATENÇÃO","texto":"Em caso de dúvida, consulte antes de usar — o natural nem sempre é sinônimo de seguro"}]},{"id":"ret-s5","nome":"Para o Seu Próximo Retorno","itens":[{"id":"ret-i14","tag":"FAZER","texto":"Anote suas dúvidas — é muito comum esquecer o que queria perguntar; escreva tudo no celular ou num papel"},{"id":"ret-i15","tag":"FAZER","texto":"Traga todos os seus exames solicitados e exames de outros médicos nesse período"}]}]},{"id":"esteatose","nome":"Esteatose Hepática","subtitulo":"Dra. Thaissa Viaggi — Hepatologista","secoes":[{"id":"est-s1","nome":"Alimentação — O que Priorizar","itens":[{"id":"est-i1","tag":"FAZER","texto":"Frutas inteiras — 4 a 5 porções por dia; prefira frutas inteiras, não sucos"},{"id":"est-i2","tag":"FAZER","texto":"Gorduras saudáveis: azeite de oliva extra virgem, peixes de águas frias (sardinha, atum, salmão), linhaça, chia e nozes"},{"id":"est-i3","tag":"FAZER","texto":"Fibras — meta de 25 a 35 g por dia: solúveis (aveia, feijões, lentilhas, frutas) e insolúveis (arroz integral, farelo de trigo, cascas de vegetais)"}]},{"id":"est-s2","nome":"Alimentação — O que Evitar","itens":[{"id":"est-i4","tag":"EVITAR","texto":"Açúcar e frutose: refrigerantes, sucos industrializados, chás gelados, bebidas energéticas, balas, biscoitos recheados, bolos industrializados, sorvetes, cereais matinais, ketchup, açúcar refinado, mel, melado, xarope de agave"},{"id":"est-i5","tag":"EVITAR","texto":"Ultraprocessados e carnes processadas: presunto, mortadela, salsicha, linguiça, nuggets, hambúrguer congelado, bacon, pizzas congeladas, salgadinhos, macarrão instantâneo, pão de forma branco, carne vermelha processada"}]},{"id":"est-s3","nome":"Exercício Físico","itens":[{"id":"est-i6","tag":"FAZER","texto":"150 min/semana de aeróbico moderado: caminhada, natação, ciclismo, hidroginástica"},{"id":"est-i7","tag":"FAZER","texto":"75 min/semana de aeróbico intenso: corrida, ciclismo rápido, natação de percurso"},{"id":"est-i8","tag":"FAZER","texto":"2–3× por semana de treino de força: musculação, treino funcional com resistência"}]},{"id":"est-s4","nome":"Meta de Perda de Peso","itens":[{"id":"est-i9","tag":"META","texto":"Redução de >10% do peso corporal — esta é a meta para observar melhora significativa na fibrose hepática e na saúde geral do fígado"}]}]}];
const PATIENTS_INIT = [{"id":1,"name":"Ana Lima","email":"ana@email.com","sent":true,"responded":true,"rating":5,"comment":"Atendimento excelente!","date":"2025-04-22"},{"id":2,"name":"Carlos Mendes","email":"carlos@email.com","sent":true,"responded":true,"rating":4,"comment":"Ótimo atendimento.","date":"2025-04-23"},{"id":3,"name":"Beatriz Souza","email":"beatriz@email.com","sent":true,"responded":false,"rating":null,"comment":"","date":"2025-04-24"}];

// ─── Helpers ────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);
const avg = (p) => { const r = p.filter(x => x.rating); return r.length ? (r.reduce((s,x)=>s+x.rating,0)/r.length).toFixed(1) : "—"; };

// ─── PDF generator (HTML→print) ─────────────────────────────
function gerarPDFUnico(paciente, diagnostico, secoes) {
  const tc = TAG_CONFIG;

  const renderSecao = (secao) => {
    const itens = secao.itens.map(i => {
      const t = tc[i.tag] || tc["EVIDÊNCIA"];
      return `<div class="item">
        <span class="tag" style="color:${t.cor};background:${t.bg};border-color:${t.borda}">${i.tag}</span>
        <span class="texto">${i.texto}</span>
      </div>`;
    }).join("");
    return `<div class="secao">
      <div class="titulo-secao">${secao.nome}</div>
      <hr class="linha-fina">
      <div class="itens">${itens}</div>
    </div>`;
  };

  const secoesHTML = secoes.map(renderSecao).join("");

  const retornoHTML = `<div class="secao retorno">
    <div class="titulo-secao">Para o Seu Próximo Retorno</div>
    <hr class="linha-fina">
    <div class="retorno-grid">
      <div class="retorno-card">
        <div class="retorno-icone">📝</div>
        <div class="retorno-titulo">Anote suas dúvidas</div>
        <div class="retorno-texto">É muito comum esquecer o que queria perguntar. Escreva tudo — no celular ou num papel. Nenhuma dúvida é pequena demais.</div>
      </div>
      <div class="retorno-card">
        <div class="retorno-icone">📋</div>
        <div class="retorno-titulo">Traga todos os seus exames</div>
        <div class="retorno-texto">Traga os exames solicitados e, se realizou exames com outros médicos nesse período, traga também. Prefiro ter uma visão completa da sua saúde.</div>
      </div>
    </div>
    <div class="retorno-msg">Foi um prazer te atender. Estamos juntos nessa jornada. Até o retorno.</div>
    <div class="retorno-insta">Instagram: @drathaissahepato</div>
  </div>`;

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
  <title>Orientações — ${paciente}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'DM Sans',sans-serif;background:#fff;color:#0d1f35}
    .page{max-width:168mm;margin:0 auto;padding:14mm 14mm 18mm}
    .logo{text-align:center;margin-bottom:4mm}
    .logo img{height:40mm}
    .linha-dourada{border:none;border-top:1.5px solid #c9a96e;width:70%;margin:3mm auto}
    .linha-fina{border:none;border-top:0.5px solid #c9a96e;margin:3mm 0 4mm}
    .diagnostico{text-align:center;font-family:'Cormorant Garamond',serif;font-size:10pt;color:#5a7a96;margin:2mm 0 1mm;letter-spacing:2px;text-transform:uppercase}
    .nome-paciente{text-align:center;font-family:'Cormorant Garamond',serif;font-size:13pt;color:#0d1f35;font-style:italic;margin-bottom:4mm}
    .secao{margin-bottom:6mm}
    .titulo-secao{font-family:'Cormorant Garamond',serif;font-size:13pt;font-weight:700;color:#0d1f35;letter-spacing:1px;text-transform:uppercase;margin-bottom:2mm}
    .item{display:flex;align-items:flex-start;gap:7px;padding:4px 0;border-bottom:0.3px solid rgba(201,169,110,0.2)}
    .tag{font-size:7pt;font-weight:600;padding:2px 6px;border-radius:20px;border:1px solid;white-space:nowrap;margin-top:2px;letter-spacing:0.4px;flex-shrink:0}
    .texto{font-size:9.5pt;color:#1e293b;line-height:1.5;padding-top:1px}
    .retorno{background:#fafaf8;border:1px solid rgba(201,169,110,0.3);border-radius:8px;padding:8mm;margin-top:8mm}
    .retorno-grid{display:grid;grid-template-columns:1fr 1fr;gap:6mm;margin:4mm 0}
    .retorno-card{background:#fff;border:0.5px solid rgba(201,169,110,0.25);border-radius:6px;padding:5mm}
    .retorno-icone{font-size:18pt;margin-bottom:2mm}
    .retorno-titulo{font-weight:600;font-size:9.5pt;color:#0d1f35;margin-bottom:2mm}
    .retorno-texto{font-size:8.5pt;color:#5a7a96;line-height:1.5}
    .retorno-msg{text-align:center;font-family:'Cormorant Garamond',serif;font-size:12pt;font-style:italic;color:#0d1f35;margin-top:5mm}
    .retorno-insta{text-align:center;font-size:8pt;color:#5a7a96;margin-top:2mm}
    .rodape{text-align:center;font-size:7.5pt;color:#5a7a96;font-style:italic;margin-top:8mm;border-top:0.5px solid #c9a96e;padding-top:3mm}
    @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.secao{page-break-inside:avoid}}
  </style></head><body>
  <div class="page">
    <div class="logo"><img src="/logo.svg"></div>
    <hr class="linha-dourada">
    <div class="diagnostico">${diagnostico}</div>
    <div class="nome-paciente">${paciente}</div>
    ${secoesHTML}
    ${retornoHTML}
    <div class="rodape">Dra. Thaissa Viaggi · Clínica Médica e Hepatologia · CRM 6536 – RQE 5857 – RQE 5878</div>
  </div>
  </body></html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (win) win.onload = () => { setTimeout(() => { win.focus(); win.print(); }, 500); };
}

// ─── Cabeçalho da clínica ────────────────────────────────────
const ClinicHeader = () => (
  <header style={{ width:"100%", background:"linear-gradient(180deg,#0a1828 0%,#0d2040 100%)",
    borderBottom:"1px solid rgba(201,169,110,0.25)", boxShadow:"0 4px 40px rgba(0,0,0,0.8)" }}>
    <div style={{ height:2, background:"linear-gradient(90deg,transparent,#c9a96e 30%,#e8d5b0 50%,#c9a96e 70%,transparent)" }} />
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"0" }}>
      <img src={"/logo.svg"} alt="Thaissa Viaggi"
        style={{ width:"100%", maxWidth:600, height:"auto", display:"block" }} />
    </div>
    <div style={{ height:2, background:"linear-gradient(90deg,transparent,#c9a96e 30%,#e8d5b0 50%,#c9a96e 70%,transparent)" }} />
  </header>
);

// ─── Página avaliação paciente ───────────────────────────────
const RatingPage = ({ patientName, onBack }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const labels = ["","Ruim","Regular","Bom","Ótimo","Excelente"];

  if (submitted) return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column",
      background:"linear-gradient(160deg,#0d1f35,#1a3558 60%,#0d2340)",
      fontFamily:"'Cormorant Garamond',Georgia,serif" }}>
      <ClinicHeader />
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ textAlign:"center", padding:40 }}>
          <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(201,169,110,0.12)",
            border:"2px solid rgba(201,169,110,0.4)", display:"flex", alignItems:"center",
            justifyContent:"center", fontSize:28, margin:"0 auto 24px" }}>✓</div>
          <h2 style={{ fontSize:28, fontWeight:400, color:"#e8d5b0", fontStyle:"italic", marginBottom:10 }}>Obrigado, {patientName}!</h2>
          <p style={{ color:"#7a9bb5", fontSize:15, lineHeight:1.8, maxWidth:320, margin:"0 auto" }}>
            Seu feedback foi recebido com carinho.<br/>Ele nos ajuda a cuidar melhor de você.
          </p>
          <button onClick={onBack} style={{ marginTop:36, padding:"10px 28px", borderRadius:8,
            border:"1px solid rgba(201,169,110,0.25)", background:"transparent",
            color:"#7a9bb5", cursor:"pointer", fontSize:13, fontFamily:"inherit" }}>← Voltar</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column",
      background:"linear-gradient(160deg,#0d1f35,#1a3558 60%,#0d2340)",
      fontFamily:"'Cormorant Garamond',Georgia,serif" }}>
      <ClinicHeader />
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"32px 24px" }}>
        <div style={{ maxWidth:460, width:"100%", background:"rgba(255,255,255,0.04)",
          backdropFilter:"blur(24px)", border:"1px solid rgba(201,169,110,0.15)",
          borderRadius:20, padding:"40px 36px", boxShadow:"0 32px 80px rgba(0,0,0,0.5)" }}>
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <h2 style={{ color:"#d4c5a9", fontSize:22, fontWeight:400, margin:"0 0 8px" }}>
              Olá, <em style={{ color:"#e8d5b0" }}>{patientName}</em>
            </h2>
            <p style={{ color:"#5a7a96", fontSize:12, margin:0, letterSpacing:"0.06em",
              textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif" }}>Como foi seu atendimento?</p>
          </div>
          <div style={{ textAlign:"center", marginBottom:6 }}>
            <div style={{ display:"flex", justifyContent:"center", gap:10 }}>
              {[1,2,3,4,5].map(n => (
                <span key={n} onMouseEnter={()=>setHover(n)} onMouseLeave={()=>setHover(0)}
                  onClick={()=>setRating(n)}
                  style={{ fontSize:42, cursor:"pointer", transition:"all .2s", display:"inline-block",
                    color:n<=(hover||rating)?"#c9a96e":"rgba(255,255,255,0.12)",
                    transform:n<=(hover||rating)?"scale(1.18)":"scale(1)",
                    filter:n<=(hover||rating)?"drop-shadow(0 0 10px rgba(201,169,110,0.7))":"none" }}>★</span>
              ))}
            </div>
            <p style={{ color:"#c9a96e", fontSize:13, minHeight:20, marginTop:8, fontStyle:"italic" }}>
              {["","Ruim","Regular","Bom","Ótimo","Excelente"][hover||rating]}
            </p>
          </div>
          <div style={{ marginTop:16 }}>
            <label style={{ color:"#5a7a96", fontSize:11, display:"block", marginBottom:8,
              textTransform:"uppercase", letterSpacing:"0.08em", fontFamily:"'DM Sans',sans-serif" }}>
              Comentário (opcional)
            </label>
            <textarea value={comment} onChange={e=>setComment(e.target.value)} rows={3}
              placeholder="Compartilhe sua experiência..."
              style={{ width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(201,169,110,0.15)",
                borderRadius:10, padding:"12px 14px", color:"#c8bfb0", fontSize:14, resize:"none",
                outline:"none", fontFamily:"inherit", boxSizing:"border-box" }} />
          </div>
          <button onClick={()=>rating>0&&setSubmitted(true)} disabled={rating===0}
            style={{ width:"100%", marginTop:20, padding:"14px", borderRadius:10, border:"none",
              background:rating>0?"linear-gradient(135deg,rgba(201,169,110,0.9),rgba(180,145,85,0.9))":"rgba(255,255,255,0.05)",
              color:rating>0?"#0d1f35":"#2d4a62", fontSize:14, fontWeight:600,
              fontFamily:"'DM Sans',sans-serif", cursor:rating>0?"pointer":"not-allowed",
              letterSpacing:"0.06em", textTransform:"uppercase" }}>
            Enviar avaliação
          </button>
          <button onClick={onBack} style={{ width:"100%", marginTop:10, padding:"10px", borderRadius:10,
            border:"1px solid rgba(255,255,255,0.05)", background:"transparent",
            color:"#2d4a62", fontSize:12, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
            ← Voltar ao painel (demo)
          </button>
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400&family=DM+Sans:wght@400;500;600&display=swap');*{box-sizing:border-box}textarea::placeholder{color:#2d4a62}`}</style>
    </div>
  );
};

// ─── PAINEL PRINCIPAL ────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("painel"); // painel | rating | guias
  const [previewPatient, setPreviewPatient] = useState(null);
  const [patients, setPatients] = useState(PATIENTS_INIT);
  const [guias, setGuias] = useState(GUIAS_INICIAIS);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [toast, setToast] = useState(null);

  // Envio
  const [guiaSel, setGuiaSel] = useState(null);    // id do guia selecionado
  const [secoesSel, setSecoesSel] = useState([]);   // ids das seções selecionadas

  // Editor de guias
  const [guiaEditId, setGuiaEditId] = useState(null);
  const [novoGuiaNome, setNovoGuiaNome] = useState("");
  const [novoGuiaSub, setNovoGuiaSub] = useState("");
  const [novaSecaoNome, setNovaSecaoNome] = useState("");
  const [novoItemTag, setNovoItemTag] = useState("FAZER");
  const [novoItemTexto, setNovoItemTexto] = useState("");
  const [secaoEditId, setSecaoEditId] = useState(null);

  const showToast = (msg, type="ok") => { setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  const guiaAtual = guias.find(g => g.id === guiaSel);

  const handleGenerate = () => {
    if (!newName.trim() || !newEmail.trim()) return;
    const subject = encodeURIComponent(`Resumo da consulta — ${newName}`);
    const link = "https://thaissaviaggi.com/avaliacao";
    const temOrientacoes = guiaAtual && secoesSel.length > 0;
    const parteDiag = temOrientacoes ? `\n\n📋 ORIENTAÇÕES DA SUA CONSULTA\nDiagnóstico: ${guiaAtual.nome}\n${guiaAtual.subtitulo}\n\n` : "";
    const body = encodeURIComponent(
      `Olá, ${newName}!\n\nFoi um prazer atendê-la(o) hoje.${parteDiag}Quando tiver um momento, sua avaliação é muito importante para mim. Leva menos de 1 minuto!\n\n👉 Clique aqui para avaliar:\n${link}\n\nAtenciosamente,\nDra. Thaissa Viaggi\nClínica Médica e Hepatologia`
    );
    setGeneratedEmail({ name: newName, email: newEmail, mailto: `mailto:${newEmail}?subject=${subject}&body=${body}` });
  };

  const handleGerarPDFs = () => {
    if (!guiaAtual || secoesSel.length === 0) { showToast("Selecione ao menos uma seção","err"); return; }
    const secoesParaGerar = guiaAtual.secoes.filter(s => secoesSel.includes(s.id));
    gerarPDFUnico(newName || "Paciente", guiaAtual.nome, secoesParaGerar);
    showToast("✓ Abrindo PDF para impressão...");
  };

  const handleSendDone = () => {
    if (!patients.find(p=>p.email===newEmail)) {
      setPatients(prev=>[...prev,{id:Date.now(),name:newName,email:newEmail,sent:true,
        responded:false,rating:null,comment:"",date:new Date().toISOString().slice(0,10)}]);
    } else {
      setPatients(prev=>prev.map(p=>p.email===newEmail?{...p,sent:true}:p));
    }
    setGeneratedEmail(null); setNewName(""); setNewEmail(""); setGuiaSel(null); setSecoesSel([]);
    showToast(`✓ E-mail para ${newName} registrado`);
  };

  // ── Editor de guias ──────────────────────────────────────
  const criarGuia = () => {
    if (!novoGuiaNome.trim()) return;
    setGuias(prev=>[...prev,{id:uid(),nome:novoGuiaNome.trim(),subtitulo:novoGuiaSub.trim(),secoes:[]}]);
    setNovoGuiaNome(""); setNovoGuiaSub("");
    showToast("✓ Guia criado");
  };
  const excluirGuia = (id) => setGuias(prev=>prev.filter(g=>g.id!==id));
  const criarSecao = (guiaId) => {
    if (!novaSecaoNome.trim()) return;
    setGuias(prev=>prev.map(g=>g.id===guiaId?{...g,secoes:[...g.secoes,{id:uid(),nome:novaSecaoNome.trim(),itens:[]}]}:g));
    setNovaSecaoNome(""); showToast("✓ Seção adicionada");
  };
  const excluirSecao = (guiaId, secaoId) =>
    setGuias(prev=>prev.map(g=>g.id===guiaId?{...g,secoes:g.secoes.filter(s=>s.id!==secaoId)}:g));
  const criarItem = (guiaId, secaoId) => {
    if (!novoItemTexto.trim()) return;
    setGuias(prev=>prev.map(g=>g.id===guiaId?{...g,secoes:g.secoes.map(s=>s.id===secaoId?{...s,itens:[...s.itens,{id:uid(),tag:novoItemTag,texto:novoItemTexto.trim()}]}:s)}:g));
    setNovoItemTexto(""); showToast("✓ Item adicionado");
  };
  const excluirItem = (guiaId, secaoId, itemId) =>
    setGuias(prev=>prev.map(g=>g.id===guiaId?{...g,secoes:g.secoes.map(s=>s.id===secaoId?{...s,itens:s.itens.filter(i=>i.id!==itemId)}:s)}:g));

  const displayed = patients.filter(p =>
    filterStatus==="all"?true:filterStatus==="responded"?p.responded:
    filterStatus==="pending"?(p.sent&&!p.responded):!p.sent);

  // ── Views ────────────────────────────────────────────────
  if (view==="rating"&&previewPatient) return <RatingPage patientName={previewPatient.name} onBack={()=>setView("painel")} />;

  // ── Vista: Editor de guias ───────────────────────────────
  if (view==="guias") return (
    <div style={{ minHeight:"100vh", background:"#070d1a", fontFamily:"'DM Sans',sans-serif", color:"#e2e8f0" }}>
      <div style={{ background:"rgba(255,255,255,0.02)", borderBottom:"1px solid rgba(255,255,255,0.06)",
        padding:"12px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <img src={"/logo.svg"} style={{ height:34 }} alt="" />
          <span style={{ fontSize:12, color:"#475569", borderLeft:"1px solid rgba(255,255,255,0.07)", paddingLeft:12 }}>Editor de Guias</span>
        </div>
        <button onClick={()=>setView("painel")} style={{ padding:"7px 16px", borderRadius:8,
          border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.04)",
          color:"#94a3b8", cursor:"pointer", fontSize:13 }}>← Voltar ao painel</button>
      </div>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"28px 24px" }}>
        {/* Criar novo guia */}
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(201,169,110,0.15)",
          borderRadius:14, padding:20, marginBottom:24 }}>
          <h3 style={{ margin:"0 0 14px", fontSize:13, fontWeight:600, color:"#c9a96e",
            textTransform:"uppercase", letterSpacing:".06em" }}>+ Novo Diagnóstico / Guia</h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
            <input value={novoGuiaNome} onChange={e=>setNovoGuiaNome(e.target.value)}
              placeholder="Nome (ex: Hepatite B Crônica)"
              style={{ padding:"9px 12px", borderRadius:8, border:"1px solid rgba(255,255,255,0.08)",
                background:"rgba(255,255,255,0.04)", color:"#e2e8f0", fontSize:13, outline:"none" }} />
            <input value={novoGuiaSub} onChange={e=>setNovoGuiaSub(e.target.value)}
              placeholder="Subtítulo (ex: EASL 2024)"
              style={{ padding:"9px 12px", borderRadius:8, border:"1px solid rgba(255,255,255,0.08)",
                background:"rgba(255,255,255,0.04)", color:"#e2e8f0", fontSize:13, outline:"none" }} />
          </div>
          <button onClick={criarGuia} style={{ padding:"9px 22px", borderRadius:8, border:"none",
            background:"linear-gradient(135deg,#c9a96e,#a07840)", color:"#0d1f35",
            cursor:"pointer", fontSize:13, fontWeight:600 }}>Criar guia</button>
        </div>

        {/* Lista de guias */}
        {guias.map(guia => (
          <div key={guia.id} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:14, marginBottom:16, overflow:"hidden" }}>
            <div style={{ padding:"14px 20px", display:"flex", alignItems:"center",
              justifyContent:"space-between", borderBottom:"1px solid rgba(255,255,255,0.05)",
              cursor:"pointer", background: guiaEditId===guia.id ? "rgba(201,169,110,0.06)" : "transparent" }}
              onClick={()=>setGuiaEditId(guiaEditId===guia.id?null:guia.id)}>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:"#e2e8f0" }}>{guia.nome}</div>
                <div style={{ fontSize:11, color:"#475569", marginTop:2 }}>{guia.subtitulo || "Sem subtítulo"} · {guia.secoes.length} seção(ões)</div>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <span style={{ fontSize:12, color:"#c9a96e" }}>{guiaEditId===guia.id?"▲ Fechar":"▼ Editar"}</span>
                <button onClick={e=>{e.stopPropagation();excluirGuia(guia.id)}}
                  style={{ padding:"3px 10px", borderRadius:6, border:"1px solid rgba(239,68,68,0.3)",
                    background:"transparent", color:"#ef4444", cursor:"pointer", fontSize:11 }}>Excluir</button>
              </div>
            </div>

            {guiaEditId===guia.id && (
              <div style={{ padding:20 }}>
                {/* Criar seção */}
                <div style={{ display:"flex", gap:8, marginBottom:16 }}>
                  <input value={novaSecaoNome} onChange={e=>setNovaSecaoNome(e.target.value)}
                    placeholder="Nome da nova seção (ex: Nutrição e Dieta)"
                    style={{ flex:1, padding:"8px 12px", borderRadius:8, border:"1px solid rgba(255,255,255,0.08)",
                      background:"rgba(255,255,255,0.04)", color:"#e2e8f0", fontSize:13, outline:"none" }} />
                  <button onClick={()=>criarSecao(guia.id)} style={{ padding:"8px 16px", borderRadius:8,
                    border:"1px solid rgba(201,169,110,0.3)", background:"rgba(201,169,110,0.08)",
                    color:"#c9a96e", cursor:"pointer", fontSize:13 }}>+ Seção</button>
                </div>

                {/* Seções existentes */}
                {guia.secoes.map(secao => (
                  <div key={secao.id} style={{ background:"rgba(255,255,255,0.02)", borderRadius:10,
                    border:"1px solid rgba(255,255,255,0.06)", marginBottom:12, overflow:"hidden" }}>
                    <div style={{ padding:"10px 14px", display:"flex", alignItems:"center",
                      justifyContent:"space-between", borderBottom:"1px solid rgba(255,255,255,0.05)",
                      cursor:"pointer" }} onClick={()=>setSecaoEditId(secaoEditId===secao.id?null:secao.id)}>
                      <span style={{ fontSize:13, fontWeight:500, color:"#cbd5e1" }}>{secao.nome}
                        <span style={{ fontSize:11, color:"#475569", marginLeft:8 }}>({secao.itens.length} itens)</span>
                      </span>
                      <div style={{ display:"flex", gap:6 }}>
                        <span style={{ fontSize:11, color:"#c9a96e" }}>{secaoEditId===secao.id?"▲":"▼"}</span>
                        <button onClick={e=>{e.stopPropagation();excluirSecao(guia.id,secao.id)}}
                          style={{ padding:"2px 8px", borderRadius:5, border:"1px solid rgba(239,68,68,0.3)",
                            background:"transparent", color:"#ef4444", cursor:"pointer", fontSize:11 }}>×</button>
                      </div>
                    </div>

                    {secaoEditId===secao.id && (
                      <div style={{ padding:14 }}>
                        {secao.itens.map(item => {
                          const tc = TAG_CONFIG[item.tag] || TAG_CONFIG["EVIDÊNCIA"];
                          return (
                            <div key={item.id} style={{ display:"flex", alignItems:"center", gap:8,
                              padding:"6px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                              <span style={{ fontSize:10, padding:"2px 8px", borderRadius:20,
                                background:tc.bg, color:tc.cor, border:`1px solid ${tc.borda}`,
                                whiteSpace:"nowrap", flexShrink:0 }}>{item.tag}</span>
                              <span style={{ fontSize:12, color:"#94a3b8", flex:1 }}>{item.texto}</span>
                              <button onClick={()=>excluirItem(guia.id,secao.id,item.id)}
                                style={{ padding:"2px 7px", borderRadius:5, border:"none",
                                  background:"rgba(239,68,68,0.1)", color:"#ef4444", cursor:"pointer", fontSize:11 }}>×</button>
                            </div>
                          );
                        })}
                        {/* Adicionar item */}
                        <div style={{ display:"flex", gap:8, marginTop:12 }}>
                          <select value={novoItemTag} onChange={e=>setNovoItemTag(e.target.value)}
                            style={{ padding:"7px 10px", borderRadius:7, border:"1px solid rgba(255,255,255,0.08)",
                              background:"#0d1f35", color:"#e2e8f0", fontSize:12, outline:"none" }}>
                            {Object.keys(TAG_CONFIG).map(t=><option key={t} value={t}>{t}</option>)}
                          </select>
                          <input value={novoItemTexto} onChange={e=>setNovoItemTexto(e.target.value)}
                            placeholder="Texto da orientação..."
                            style={{ flex:1, padding:"7px 12px", borderRadius:7, border:"1px solid rgba(255,255,255,0.08)",
                              background:"rgba(255,255,255,0.04)", color:"#e2e8f0", fontSize:12, outline:"none" }} />
                          <button onClick={()=>criarItem(guia.id,secao.id)}
                            style={{ padding:"7px 14px", borderRadius:7, border:"none",
                              background:"linear-gradient(135deg,#3b82f6,#6366f1)", color:"#fff",
                              cursor:"pointer", fontSize:12 }}>+ Item</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <style>{`*{box-sizing:border-box}input::placeholder,textarea::placeholder{color:#334155}`}</style>
    </div>
  );

  // ── Vista: Painel principal ──────────────────────────────
  return (
    <div style={{ minHeight:"100vh", background:"#070d1a", fontFamily:"'DM Sans',sans-serif", color:"#e2e8f0" }}>
      {toast && (
        <div style={{ position:"fixed", top:20, right:20, zIndex:999, padding:"12px 20px", borderRadius:10,
          background:toast.type==="err"?"#7f1d1d":"#065f46",
          color:toast.type==="err"?"#fca5a5":"#a7f3d0",
          fontSize:14, boxShadow:"0 8px 24px rgba(0,0,0,0.4)" }}>{toast.msg}</div>
      )}

      {/* Header */}
      <div style={{ background:"rgba(255,255,255,0.02)", borderBottom:"1px solid rgba(255,255,255,0.06)",
        padding:"12px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <img src={"/logo.svg"} style={{ height:34 }} alt="" />
          <span style={{ fontSize:12, color:"#475569", borderLeft:"1px solid rgba(255,255,255,0.07)", paddingLeft:12 }}>Painel de Feedback</span>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={()=>setView("guias")} style={{ padding:"7px 16px", borderRadius:8,
            border:"1px solid rgba(201,169,110,0.25)", background:"rgba(201,169,110,0.06)",
            color:"#c9a96e", cursor:"pointer", fontSize:13 }}>📋 Editar Guias</button>
          <button onClick={()=>{
            const h="Nome,Email,Enviado,Respondeu,Nota,Comentário,Data";
            const r=patients.map(p=>[`"${p.name}"`,`"${p.email}"`,`"${p.sent?"Sim":"Não"}"`,`"${p.responded?"Sim":"Não"}"`,`"${p.rating??''}"`,`"${p.comment}"`,`"${p.date??''}"`].join(","));
            const b=new Blob([[h,...r].join("\n")],{type:"text/csv"});
            const u=URL.createObjectURL(b);
            const a=document.createElement("a");a.href=u;a.download="feedbacks.csv";a.click();
          }} style={{ padding:"7px 16px", borderRadius:8, border:"1px solid rgba(255,255,255,0.1)",
            background:"rgba(255,255,255,0.04)", color:"#94a3b8", cursor:"pointer", fontSize:13 }}>↓ Exportar</button>
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:"0 auto", padding:"24px 20px" }}>
        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
          {[
            { label:"Total", value:patients.length, icon:"👥", cor:"#3b82f6" },
            { label:"Enviados", value:patients.filter(p=>p.sent).length, icon:"📨", cor:"#8b5cf6" },
            { label:"Respostas", value:patients.filter(p=>p.responded).length, icon:"✅", cor:"#10b981" },
            { label:"Nota média", value:avg(patients), icon:"⭐", cor:"#c9a96e" },
          ].map((s,i)=>(
            <div key={i} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)",
              borderRadius:12, padding:"16px 18px" }}>
              <div style={{ fontSize:20, marginBottom:6 }}>{s.icon}</div>
              <div style={{ fontSize:24, fontWeight:700, color:s.cor }}>{s.value}</div>
              <div style={{ fontSize:11, color:"#475569", marginTop:3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:24 }}>
          {/* Formulário envio */}
          <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:20 }}>
            <h3 style={{ margin:"0 0 14px", fontSize:12, fontWeight:600, color:"#94a3b8", textTransform:"uppercase", letterSpacing:".06em" }}>
              Enviar para paciente
            </h3>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="Nome do paciente"
                style={{ padding:"9px 12px", borderRadius:8, border:"1px solid rgba(255,255,255,0.08)",
                  background:"rgba(255,255,255,0.04)", color:"#e2e8f0", fontSize:13, outline:"none" }} />
              <input value={newEmail} onChange={e=>setNewEmail(e.target.value)} placeholder="E-mail do paciente"
                style={{ padding:"9px 12px", borderRadius:8, border:"1px solid rgba(255,255,255,0.08)",
                  background:"rgba(255,255,255,0.04)", color:"#e2e8f0", fontSize:13, outline:"none" }} />

              {/* Seleção de guia */}
              <select value={guiaSel||""} onChange={e=>{setGuiaSel(e.target.value||null);setSecoesSel([])}}
                style={{ padding:"9px 12px", borderRadius:8, border:"1px solid rgba(255,255,255,0.08)",
                  background:"#0d1f35", color: guiaSel ? "#e2e8f0" : "#475569", fontSize:13, outline:"none" }}>
                <option value="">— Diagnóstico / Guia (opcional) —</option>
                {guias.map(g=><option key={g.id} value={g.id}>{g.nome}</option>)}
              </select>

              {/* Seções do guia selecionado */}
              {guiaAtual && (
                <div style={{ background:"rgba(201,169,110,0.05)", border:"1px solid rgba(201,169,110,0.15)",
                  borderRadius:10, padding:12 }}>
                  <div style={{ fontSize:11, color:"#c9a96e", marginBottom:8, textTransform:"uppercase", letterSpacing:".05em" }}>
                    Seções para incluir no PDF
                  </div>
                  {guiaAtual.secoes.map(s=>(
                    <label key={s.id} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6, cursor:"pointer" }}>
                      <input type="checkbox" checked={secoesSel.includes(s.id)}
                        onChange={()=>setSecoesSel(prev=>prev.includes(s.id)?prev.filter(x=>x!==s.id):[...prev,s.id])}
                        style={{ accentColor:"#c9a96e" }} />
                      <span style={{ fontSize:12, color:"#cbd5e1" }}>{s.nome}</span>
                      <span style={{ fontSize:10, color:"#475569" }}>({s.itens.length} itens)</span>
                    </label>
                  ))}
                  {secoesSel.length > 0 && (
                    <button onClick={handleGerarPDFs}
                      style={{ width:"100%", marginTop:8, padding:"8px", borderRadius:8, border:"none",
                        background:"linear-gradient(135deg,rgba(201,169,110,0.9),rgba(160,120,64,0.9))",
                        color:"#0d1f35", fontSize:12, fontWeight:600, cursor:"pointer", letterSpacing:".04em" }}>
                      📄 Gerar {secoesSel.length} PDF(s) separado(s)
                    </button>
                  )}
                </div>
              )}

              <button onClick={handleGenerate} disabled={!newName.trim()||!newEmail.trim()}
                style={{ padding:"10px", borderRadius:8, border:"none",
                  background:newName&&newEmail?"linear-gradient(135deg,#3b82f6,#6366f1)":"rgba(255,255,255,0.05)",
                  color:newName&&newEmail?"#fff":"#374151",
                  cursor:newName&&newEmail?"pointer":"not-allowed", fontSize:13, fontWeight:500 }}>
                ✉ Gerar e-mail de avaliação
              </button>
            </div>

            {generatedEmail && (
              <div style={{ marginTop:14, background:"rgba(59,130,246,0.08)", border:"1px solid rgba(59,130,246,0.2)",
                borderRadius:10, padding:14 }}>
                <p style={{ fontSize:12, color:"#93c5fd", margin:"0 0 10px" }}>
                  📧 E-mail gerado para <strong>{generatedEmail.name}</strong>
                </p>
                <div style={{ display:"flex", gap:8 }}>
                  <a href={generatedEmail.mailto} style={{ flex:1, textAlign:"center", padding:"8px", borderRadius:7,
                    background:"linear-gradient(135deg,#0ea5e9,#3b82f6)", color:"#fff",
                    textDecoration:"none", fontSize:12, fontWeight:500 }}>📨 Abrir e-mail</a>
                  <button onClick={handleSendDone} style={{ flex:1, padding:"8px", borderRadius:7,
                    border:"1px solid rgba(16,185,129,0.3)", background:"rgba(16,185,129,0.1)",
                    color:"#10b981", cursor:"pointer", fontSize:12 }}>✓ Já enviei</button>
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:14, padding:20, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
            <div>
              <h3 style={{ margin:"0 0 10px", fontSize:12, fontWeight:600, color:"#94a3b8",
                textTransform:"uppercase", letterSpacing:".06em" }}>Página do paciente</h3>
              <p style={{ color:"#475569", fontSize:12, lineHeight:1.6, margin:0 }}>
                Visualize como o paciente vê a página de avaliação — personalizada com o nome e identidade visual da clínica.
              </p>
            </div>
            <div>
              <input value={newName||"Ana Lima"} readOnly
                style={{ width:"100%", padding:"8px 12px", borderRadius:7, border:"1px solid rgba(255,255,255,0.07)",
                  background:"rgba(255,255,255,0.03)", color:"#64748b", fontSize:12,
                  boxSizing:"border-box", marginBottom:8 }} />
              <button onClick={()=>{setPreviewPatient({name:newName||"Ana Lima"});setView("rating")}}
                style={{ width:"100%", padding:"10px", borderRadius:8,
                  border:"1px solid rgba(201,169,110,0.25)", background:"rgba(201,169,110,0.06)",
                  color:"#c9a96e", cursor:"pointer", fontSize:13 }}>
                👁 Visualizar página de avaliação
              </button>
            </div>
          </div>
        </div>

        {/* Lista pacientes */}
        <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, overflow:"hidden" }}>
          <div style={{ padding:"14px 20px", borderBottom:"1px solid rgba(255,255,255,0.05)",
            display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <h3 style={{ margin:0, fontSize:12, fontWeight:600, color:"#94a3b8", textTransform:"uppercase", letterSpacing:".06em" }}>Pacientes</h3>
            <div style={{ display:"flex", gap:4 }}>
              {[["all","Todos"],["responded","Responderam"],["pending","Aguardando"],["unsent","Não enviado"]].map(([v,l])=>(
                <button key={v} onClick={()=>setFilterStatus(v)}
                  style={{ padding:"4px 10px", borderRadius:20, border:"none", fontSize:11, cursor:"pointer",
                    background:filterStatus===v?"rgba(59,130,246,0.2)":"transparent",
                    color:filterStatus===v?"#93c5fd":"#475569" }}>{l}</button>
              ))}
            </div>
          </div>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                {["Paciente","Status","Nota","Comentário","Data",""].map(h=>(
                  <th key={h} style={{ padding:"10px 18px", textAlign:"left", fontSize:10,
                    color:"#334155", fontWeight:600, textTransform:"uppercase", letterSpacing:".06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayed.map(p=>(
                <tr key={p.id} style={{ borderBottom:"1px solid rgba(255,255,255,0.03)" }}>
                  <td style={{ padding:"12px 18px" }}>
                    <div style={{ fontSize:13, fontWeight:500, color:"#e2e8f0" }}>{p.name}</div>
                    <div style={{ fontSize:11, color:"#334155" }}>{p.email}</div>
                  </td>
                  <td style={{ padding:"12px 18px" }}>
                    <span style={{ padding:"3px 9px", borderRadius:20, fontSize:10, fontWeight:500,
                      background:p.responded?"rgba(16,185,129,0.1)":p.sent?"rgba(245,158,11,0.1)":"rgba(71,85,105,0.2)",
                      color:p.responded?"#10b981":p.sent?"#f59e0b":"#475569" }}>
                      {p.responded?"✓ Respondeu":p.sent?"⏳ Aguardando":"Não enviado"}
                    </span>
                  </td>
                  <td style={{ padding:"12px 18px" }}>
                    {p.rating?<div style={{ display:"flex", gap:2 }}>{[1,2,3,4,5].map(n=><span key={n} style={{ fontSize:13, color:n<=p.rating?"#c9a96e":"rgba(255,255,255,0.1)" }}>★</span>)}</div>:<span style={{ color:"#1e293b" }}>—</span>}
                  </td>
                  <td style={{ padding:"12px 18px", maxWidth:180 }}>
                    <span style={{ fontSize:12, color:"#64748b", display:"block", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.comment||"—"}</span>
                  </td>
                  <td style={{ padding:"12px 18px" }}><span style={{ fontSize:11, color:"#334155" }}>{p.date||"—"}</span></td>
                  <td style={{ padding:"12px 18px" }}>
                    <button onClick={()=>{setPreviewPatient(p);setView("rating")}}
                      style={{ padding:"4px 10px", borderRadius:6, border:"1px solid rgba(255,255,255,0.06)",
                        background:"transparent", color:"#475569", cursor:"pointer", fontSize:11 }}>Ver página</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {displayed.length===0&&<div style={{ padding:36, textAlign:"center", color:"#334155", fontSize:13 }}>Nenhum paciente neste filtro.</div>}
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap');*{box-sizing:border-box}input::placeholder{color:#334155}`}</style>
    </div>
  );
}
