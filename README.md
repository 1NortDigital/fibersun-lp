# LP FiberSun Solar — 1Nort Digital

Landing page de captação solar da **FiberSun Solar** (Fortaleza / Maracanaú / Grande Fortaleza — CE).
Baseada na estratégia de conversão validada na Brayner, com **design e layout próprios** (azul + amarelo solar, fonte Poppins, formulário já no hero).

**Stack:** HTML/CSS/JS estático single-file, sem build, sem dependências.

---

## Estratégia de conversão (igual Brayner)

- **3 formulários**, todos enviando pros mesmos 3 destinos:
  1. **Form principal** no hero (nome, WhatsApp, cidade, conta, tipo de imóvel)
  2. **Calculadora** de economia (captura o lead já no clique de calcular)
  3. **Modal** acionado por TODOS os botões/CTAs e pelo botão flutuante do WhatsApp
- Ao enviar qualquer form, o lead vai para **3 lugares**:
  1. **Webhook** (n8n da agência) → `WEBHOOK`
  2. **Planilha Google** da FiberSun → `SHEET_BACKUP` (redundância)
  3. **WhatsApp** abre com a mensagem já preenchida com os dados do lead
- **Botão flutuante de WhatsApp** abre o modal de formulário (não vai direto pro wa.me).
- **UTM tracking**: captura utm_source/medium/campaign/content/term, gclid, fbclid + cookie de 30 dias.
- **GTM ready**: dispara `lead_gerado` no dataLayer em todos os forms.

---

## Configuração (constantes no `<script>` final do index.html)

| Constante | Valor atual | Observação |
|---|---|---|
| `WEBHOOK` | n8n da agência | Roteado por `pagina = lp-fibersun` |
| `SHEET_BACKUP` | **(vazio)** | ⚠️ Falta colar a URL `/exec` — ver abaixo |
| `WHATSAPP_NUMBER` | `5585997060941` | (85) 9 9706-0941 |
| `REDIRECT_OBRIGADO` | (vazio) | Opcional: página de obrigado |

### ⚠️ Ativar a planilha (passo pendente)

O `SHEET_BACKUP` precisa da URL de **implantação do Apps Script** (termina em `/exec`),
não do link de edição da planilha. Para gerar:

1. Abra a planilha da FiberSun → **Extensões → Apps Script**
2. Cole o conteúdo de **`apps-script-planilha.gs`** (já aponta pra planilha correta)
3. **Implantar → Nova implantação → App da Web** · Executar como "Eu" · Acesso "Qualquer pessoa"
4. Copie a URL `/exec` e cole em `const SHEET_BACKUP = '...'` no `index.html`

Enquanto isso não for feito, os leads continuam indo normalmente pro **webhook + WhatsApp** — só a planilha fica inativa.

---

## Pendências de conteúdo (opcionais)

- **Logo:** está usando uma logo em texto ("FiberSun" + ícone de sol). Se a FiberSun mandar o PNG, troca-se o bloco `.logo-mark` + `.logo-txt`.
- **GTM:** trocar `GTM-XXXXXXXX` no `<head>` pelo ID real e descomentar o bloco.
- **Números do hero** (90%, 25+ anos, 5,0★): genéricos/seguros. Trocar se a FiberSun tiver dados próprios (nº de projetos, kWp instalados, etc).
- **Depoimentos:** os 3 são os reais do site atual (Maria Rodrigues, João Silva, Ana Santos).
- **Imagens das soluções:** Unsplash temporário. Trocar por fotos reais de projetos da FiberSun.

---

## Deploy (GitHub Pages, padrão da agência)

1. Repo `1NortDigital/fibersun-lp` (público)
2. Push do código → Settings → Pages → Source `main`, folder `/` (root)
3. URL viva: `https://1nortdigital.github.io/fibersun-lp/`
4. Domínio próprio: criar `CNAME` (ex: `solar.fibersun.com.br`) e apontar DNS pra `1nortdigital.github.io`

---

## Dados da FiberSun usados

- **Endereço:** Av. Carlos Jereissati, 1 - Altos, Maracanaú - CE, 61900-510
- **WhatsApp:** (85) 9 9706-0941 · (segundo número no site: (85) 98559-0043)
- **Instagram:** @fibersun_solar
- **Horário:** Seg–Sex 7h30–17h · Sáb 8h–12h
- **Atuação:** Fortaleza, Maracanaú, Pacatuba e Grande Fortaleza
- **Serviços:** residencial, comercial, locação de energia, monitoramento por app
