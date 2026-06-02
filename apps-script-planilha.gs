/**
 * FiberSun — Apps Script para gravar os leads da landing page na planilha.
 * Planilha: https://docs.google.com/spreadsheets/d/1GyV7dXaAYeC408-1Otz8E_Lpi5HwUhDW7CYee-D_0Sg/edit
 *
 * COMO ATIVAR:
 * 1. Abra a planilha acima → menu Extensões → Apps Script.
 * 2. Apague o conteúdo padrão e cole TODO este arquivo.
 * 3. Salve. Clique em "Implantar" → "Nova implantação".
 * 4. Tipo: "App da Web". Executar como: "Eu". Quem pode acessar: "Qualquer pessoa".
 * 5. Implantar → autorize com sua conta Google.
 * 6. Copie a URL que termina em /exec.
 * 7. Cole essa URL na constante SHEET_BACKUP do index.html.
 */

var SHEET_ID = '1GyV7dXaAYeC408-1Otz8E_Lpi5HwUhDW7CYee-D_0Sg';
var SHEET_NAME = 'Leads'; // nome da aba; será criada automaticamente se não existir

var COLS = [
  'timestamp','form_type','pagina','nome','telefone','cidade',
  'conta_mensal','conta_calc','segmento','ip',
  'utm_source','utm_medium','utm_campaign','utm_content','utm_term',
  'gclid','fbclid','page_url','page_referer'
];

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // garante cabeçalho
    if (sh.getLastRow() === 0) {
      sh.appendRow(COLS.map(function(c){ return c; }));
    }

    var recebido = Utilities.formatDate(new Date(), 'America/Fortaleza', 'dd/MM/yyyy HH:mm:ss');
    var row = COLS.map(function(c){
      if (c === 'timestamp') return data.timestamp || recebido;
      return data[c] !== undefined && data[c] !== null ? data[c] : '';
    });
    // primeira coluna = data/hora legível de recebimento
    row[0] = recebido;
    sh.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, msg: 'FiberSun lead endpoint ativo.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
