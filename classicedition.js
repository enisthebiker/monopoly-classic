
function currentLanguage() {
    return localStorage.getItem("monopolyLanguage") || "en";
}

function gameText(english, turkish) {
    return currentLanguage() === "tr" ? turkish : english;
}

function Square(name, pricetext, color, price, groupNumber, baserent, rent1, rent2, rent3, rent4, rent5, turkishName, turkishPriceText) {
    this._englishName = name;
    this._turkishName = turkishName || name;
    this._englishPriceText = pricetext;
    this._turkishPriceText = turkishPriceText || pricetext;

    Object.defineProperty(this, "name", {
        get: function() {
            return gameText(this._englishName, this._turkishName);
        }
    });

    Object.defineProperty(this, "pricetext", {
        get: function() {
            return gameText(this._englishPriceText, this._turkishPriceText);
        }
    });

    this.color = color;
    this.owner = 0;
    this.mortgage = false;
    this.house = 0;
    this.hotel = 0;
    this.groupNumber = groupNumber || 0;
    this.price = (price || 0);
    this.baserent = (baserent || 0);
    this.rent1 = (rent1 || 0);
    this.rent2 = (rent2 || 0);
    this.rent3 = (rent3 || 0);
    this.rent4 = (rent4 || 0);
    this.rent5 = (rent5 || 0);
    this.landcount = 0;

    if (groupNumber === 3 || groupNumber === 4) {
        this.houseprice = 50;
    } else if (groupNumber === 5 || groupNumber === 6) {
        this.houseprice = 100;
    } else if (groupNumber === 7 || groupNumber === 8) {
        this.houseprice = 150;
    } else if (groupNumber === 9 || groupNumber === 10) {
        this.houseprice = 200;
    } else {
        this.houseprice = 0;
    }
}

function Card(text, action, turkishText) {
    this._englishText = text;
    this._turkishText = turkishText || text;
    this.action = action;

    Object.defineProperty(this, "text", {
        get: function() {
            return gameText(this._englishText, this._turkishText);
        }
    });
}

function corrections() {
    document.getElementById("cell1name").textContent = gameText(
        "Mediter-ranean Avenue",
        "Akdeniz Caddesi"
    );

    // Add images to enlarges.
    document.getElementById("enlarge5token").innerHTML += '<img src="images/train_icon.png" height="60" width="65" alt="" style="position: relative; bottom: 20px;" />';
    document.getElementById("enlarge15token").innerHTML += '<img src="images/train_icon.png" height="60" width="65" alt="" style="position: relative; top: -20px;" />';
    document.getElementById("enlarge25token").innerHTML += '<img src="images/train_icon.png" height="60" width="65" alt="" style="position: relative; top: -20px;" />';
    document.getElementById("enlarge35token").innerHTML += '<img src="images/train_icon.png" height="60" width="65" alt="" style="position: relative; top: -20px;" />';
    document.getElementById("enlarge12token").innerHTML += '<img src="images/electric_icon.png" height="60" width="48" alt="" style="position: relative; top: -20px;" />';
    document.getElementById("enlarge28token").innerHTML += '<img src="images/water_icon.png" height="60" width="78" alt="" style="position: relative; top: -20px;" />';
}

function utiltext() {
    return currentLanguage() === "tr"
        ? '&nbsp;&nbsp;&nbsp;&nbsp;Tek bir Elektrik veya Su İşleri mülkü sahipse kira, zarda gelen sayının 4 katıdır.<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;Her iki mülk de aynı oyuncuya aitse kira, zarda gelen sayının 10 katıdır.'
        : '&nbsp;&nbsp;&nbsp;&nbsp;If one "Utility" is owned rent is 4 times amount shown on dice.<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;If both "Utilitys" are owned rent is 10 times amount shown on dice.';
}

function transtext() {
    return currentLanguage() === "tr"
        ? '<div style="font-size: 14px; line-height: 1.5;">Kira<span style="float: right;">$25.</span><br />2 Demiryolu varsa<span style="float: right;">50.</span><br />3 Demiryolu varsa<span style="float: right;">100.</span><br />4 Demiryolu varsa<span style="float: right;">200.</span></div>'
        : '<div style="font-size: 14px; line-height: 1.5;">Rent<span style="float: right;">$25.</span><br />If 2 Railroads are owned<span style="float: right;">50.</span><br />If 3 &nbsp; &nbsp; " &nbsp; &nbsp; " &nbsp; &nbsp; "<span style="float: right;">100.</span><br />If 4 &nbsp; &nbsp; " &nbsp; &nbsp; " &nbsp; &nbsp; "<span style="float: right;">200.</span></div>';
}

function luxurytax() {
    addAlert(player[turn].name + gameText(" paid $100 for landing on Luxury Tax.", " Lüks Vergisi'ne geldi ve $100 ödedi."));
    player[turn].pay(100, 0);

    $("#landed").show().text(gameText("You landed on Luxury Tax. Pay $100.", "Lüks Vergisi'ne geldin. $100 öde."));
}

function citytax() {
    addAlert(player[turn].name + gameText(" paid $200 for landing on City Tax.", " Şehir Vergisi'ne geldi ve $200 ödedi."));
    player[turn].pay(200, 0);

    $("#landed").show().text(gameText("You landed on City Tax. Pay $200.", "Şehir Vergisi'ne geldin. $200 öde."));
}

var square = [];

square[0] = new Square("GO", "COLLECT $200 SALARY AS YOU PASS.", "#FFFFFF", 0, 0, 0, 0, 0, 0, 0, 0, "BAŞLANGIÇ", "Geçerken $200 maaş al.");

square[1] = new Square("Mediterranean Avenue", "$60", "#8B4513", 60, 3, 2, 10, 30, 90, 160, 250, "Akdeniz Caddesi");
square[2] = new Square("Community Chest", "FOLLOW INSTRUCTIONS ON TOP CARD", "#FFFFFF", 0, 0, 0, 0, 0, 0, 0, 0, "Kamu Fonu", "ÜSTTEKİ KARTTAKİ TALİMATI UYGULA.");
square[3] = new Square("Baltic Avenue", "$60", "#8B4513", 60, 3, 4, 20, 60, 180, 320, 450, "Baltık Caddesi");
square[4] = new Square("City Tax", "Pay $200", "#FFFFFF", 0, 0, 0, 0, 0, 0, 0, 0, "Şehir Vergisi", "$200 öde.");
square[5] = new Square("Reading Railroad", "$200", "#FFFFFF", 200, 1, 0, 0, 0, 0, 0, 0, "Reading Demiryolu");
square[6] = new Square("Oriental Avenue", "$100", "#87CEEB", 100, 4, 6, 30, 90, 270, 400, 550, "Doğu Caddesi");
square[7] = new Square("Chance", "FOLLOW INSTRUCTIONS ON TOP CARD", "#FFFFFF", 0, 0, 0, 0, 0, 0, 0, 0, "Şans", "ÜSTTEKİ KARTTAKİ TALİMATI UYGULA.");
square[8] = new Square("Vermont Avenue", "$100", "#87CEEB", 100, 4, 6, 30, 90, 270, 400, 550, "Vermont Caddesi");
square[9] = new Square("Connecticut Avenue", "$120", "#87CEEB", 120, 4, 8, 40, 100, 300, 450, 600, "Connecticut Caddesi");
square[10] = new Square("Just Visiting", "", "#FFFFFF", 0, 0, 0, 0, 0, 0, 0, 0, "Sadece Ziyaret");
square[11] = new Square("St. Charles Place", "$140", "#FF0080", 140, 5, 10, 50, 150, 450, 625, 750, "St. Charles Meydanı");
square[12] = new Square("Electric Company", "$150", "#FFFFFF", 150, 2, 0, 0, 0, 0, 0, 0, "Elektrik Şirketi");
square[13] = new Square("States Avenue", "$140", "#FF0080", 140, 5, 10, 50, 150, 450, 625, 750, "States Caddesi");
square[14] = new Square("Virginia Avenue", "$160", "#FF0080", 160, 5, 12, 60, 180, 500, 700, 900, "Virginia Caddesi");
square[15] = new Square("Pennsylvania Railroad", "$200", "#FFFFFF", 200, 1, 0, 0, 0, 0, 0, 0, "Pennsylvania Demiryolu");
square[16] = new Square("St. James Place", "$180", "#FFA500", 180, 6, 14, 70, 200, 550, 750, 950, "St. James Meydanı");
square[17] = new Square("Community Chest", "FOLLOW INSTRUCTIONS ON TOP CARD", "#FFFFFF", 0, 0, 0, 0, 0, 0, 0, 0, "Kamu Fonu", "ÜSTTEKİ KARTTAKİ TALİMATI UYGULA.");
square[18] = new Square("Tennessee Avenue", "$180", "#FFA500", 180, 6, 14, 70, 200, 550, 750, 950, "Tennessee Caddesi");
square[19] = new Square("New York Avenue", "$200", "#FFA500", 200, 6, 16, 80, 220, 600, 800, 1000, "New York Caddesi");
square[20] = new Square("Free Parking", "", "#FFFFFF", 0, 0, 0, 0, 0, 0, 0, 0, "Ücretsiz Otopark");
square[21] = new Square("Kentucky Avenue", "$220", "#FF0000", 220, 7, 18, 90, 250, 700, 875, 1050, "Kentucky Caddesi");
square[22] = new Square("Chance", "FOLLOW INSTRUCTIONS ON TOP CARD", "#FFFFFF", 0, 0, 0, 0, 0, 0, 0, 0, "Şans", "ÜSTTEKİ KARTTAKİ TALİMATI UYGULA.");
square[23] = new Square("Indiana Avenue", "$220", "#FF0000", 220, 7, 18, 90, 250, 700, 875, 1050, "Indiana Caddesi");
square[24] = new Square("Illinois Avenue", "$240", "#FF0000", 240, 7, 20, 100, 300, 750, 925, 1100, "Illinois Caddesi");
square[25] = new Square("B&O Railroad", "$200", "#FFFFFF", 200, 1, 0, 0, 0, 0, 0, 0, "B&O Demiryolu");
square[26] = new Square("Atlantic Avenue", "$260", "#FFFF00", 260, 8, 22, 110, 330, 800, 975, 1150, "Atlantic Caddesi");
square[27] = new Square("Ventnor Avenue", "$260", "#FFFF00", 260, 8, 22, 110, 330, 800, 975, 1150, "Ventnor Caddesi");
square[28] = new Square("Water Works", "$150", "#FFFFFF", 150, 2, 0, 0, 0, 0, 0, 0, "Su İşleri");
square[29] = new Square("Marvin Gardens", "$280", "#FFFF00", 280, 8, 24, 120, 360, 850, 1025, 1200, "Marvin Bahçeleri");
square[30] = new Square("Go to Jail", "Go directly to Jail. Do not pass GO. Do not collect $200.", "#FFFFFF", 0, 0, 0, 0, 0, 0, 0, 0, "Hapse Git", "Doğrudan hapse git. Başlangıçtan geçme. $200 alma.");
square[31] = new Square("Pacific Avenue", "$300", "#008000", 300, 9, 26, 130, 390, 900, 1100, 1275, "Pacific Caddesi");
square[32] = new Square("North Carolina Avenue", "$300", "#008000", 300, 9, 26, 130, 390, 900, 1100, 1275, "Kuzey Carolina Caddesi");
square[33] = new Square("Community Chest", "FOLLOW INSTRUCTIONS ON TOP CARD", "#FFFFFF", 0, 0, 0, 0, 0, 0, 0, 0, "Kamu Fonu", "ÜSTTEKİ KARTTAKİ TALİMATI UYGULA.");
square[34] = new Square("Pennsylvania Avenue", "$320", "#008000", 320, 9, 28, 150, 450, 1000, 1200, 1400, "Pennsylvania Caddesi");
square[35] = new Square("Short Line", "$200", "#FFFFFF", 200, 1, 0, 0, 0, 0, 0, 0, "Kısa Hat Demiryolu");
square[36] = new Square("Chance", "FOLLOW INSTRUCTIONS ON TOP CARD", "#FFFFFF", 0, 0, 0, 0, 0, 0, 0, 0, "Şans", "ÜSTTEKİ KARTTAKİ TALİMATI UYGULA.");
square[37] = new Square("Park Place", "$350", "#0000FF", 350, 10, 35, 175, 500, 1100, 1300, 1500, "Park Meydanı");
square[38] = new Square("LUXURY TAX", "Pay $100", "#FFFFFF", 0, 0, 0, 0, 0, 0, 0, 0, "LÜKS VERGİSİ", "$100 öde.");
square[39] = new Square("Boardwalk", "$400", "#0000FF", 400, 10, 50, 200, 600, 1400, 1700, 2000, "Sahil Yolu");

var communityChestCards = [];
var chanceCards = [];

communityChestCards[0] = new Card("Get out of Jail, Free. This card may be kept until needed or sold.", function(p) { p.communityChestJailCard = true; updateOwned();}, "Hapisten ücretsiz çık. Bu kartı ihtiyaç duyana kadar saklayabilir veya satabilirsin.");
communityChestCards[1] = new Card("You have won second prize in a beauty contest. Collect $10.", function() { addamount(10, 'Community Chest');}, "Bir güzellik yarışmasında ikinci oldun. $10 al.");
communityChestCards[2] = new Card("From sale of stock, you get $50.", function() { addamount(50, 'Community Chest');}, "Hisse senedi satışından $50 kazandın.");
communityChestCards[3] = new Card("Life insurance matures. Collect $100.", function() { addamount(100, 'Community Chest');}, "Hayat sigortan vadesini doldurdu. $100 al.");
communityChestCards[4] = new Card("Income tax refund. Collect $20.", function() { addamount(20, 'Community Chest');}, "Gelir vergisi iadesi. $20 al.");
communityChestCards[5] = new Card("Holiday fund matures. Receive $100.", function() { addamount(100, 'Community Chest');}, "Tatil birikimin vadesini doldurdu. $100 al.");
communityChestCards[6] = new Card("You inherit $100.", function() { addamount(100, 'Community Chest');}, "$100 miras kaldı.");
communityChestCards[7] = new Card("Receive $25 consultancy fee.", function() { addamount(25, 'Community Chest');}, "$25 danışmanlık ücreti al.");
communityChestCards[8] = new Card("Pay hospital fees of $100.", function() { subtractamount(100, 'Community Chest');}, "$100 hastane masrafı öde.");
communityChestCards[9] = new Card("Bank error in your favor. Collect $200.", function() { addamount(200, 'Community Chest');}, "Banka lehine hata yaptı. $200 al.");
communityChestCards[10] = new Card("Pay school fees of $50.", function() { subtractamount(50, 'Community Chest');}, "$50 okul masrafı öde.");
communityChestCards[11] = new Card("Doctor's fee. Pay $50.", function() { subtractamount(50, 'Community Chest');}, "Doktor ücreti. $50 öde.");
communityChestCards[12] = new Card("It is your birthday. Collect $10 from every player.", function() { collectfromeachplayer(10, 'Community Chest');}, "Bugün doğum günün. Her oyuncudan $10 al.");
communityChestCards[13] = new Card("Advance to \"GO\" (Collect $200).", function() { advance(0);}, "BAŞLANGIÇ karesine ilerle. $200 al.");
communityChestCards[14] = new Card("You are assessed for street repairs. $40 per house. $115 per hotel.", function() { streetrepairs(40, 115);}, "Yol bakım masrafı: Her ev için $40, her otel için $115 öde.");
communityChestCards[15] = new Card("Go to Jail. Go directly to Jail. Do not pass \"GO\". Do not collect $200.", function() { gotojail();}, "Hapse git. Doğrudan hapishaneye git. BAŞLANGIÇ'tan geçme ve $200 alma.");

chanceCards[0] = new Card("GET OUT OF JAIL FREE. This card may be kept until needed or traded.", function(p) { p.chanceJailCard=true; updateOwned();}, "HAPİSTEN ÜCRETSİZ ÇIKIŞ. Bu kartı ihtiyaç duyana kadar saklayabilir veya takas edebilirsin.");
chanceCards[1] = new Card("Make General Repairs on All Your Property. For each house pay $25. For each hotel $100.", function() { streetrepairs(25, 100);}, "Tüm mülklerinde genel bakım yap. Her ev için $25, her otel için $100 öde.");
chanceCards[2] = new Card("Speeding fine $15.", function() { subtractamount(15, 'Chance');}, "Hız cezası: $15 öde.");
chanceCards[3] = new Card("You have been elected chairman of the board. Pay each player $50.", function() { payeachplayer(50, 'Chance');}, "Yönetim kurulu başkanı seçildin. Her oyuncuya $50 öde.");
chanceCards[4] = new Card("Go back three spaces.", function() { gobackthreespaces();}, "Üç kare geri git.");
chanceCards[5] = new Card("ADVANCE TO THE NEAREST UTILITY. IF UNOWNED, you may buy it from the Bank. IF OWNED, throw dice and pay owner a total ten times the amount thrown.", function() { advanceToNearestUtility();}, "EN YAKIN ELEKTRİK VEYA SU İŞLERİ KARESİNE İLERLE. Sahibi yoksa bankadan satın alabilirsin. Sahibi varsa zar at ve gelen sayının 10 katını mülk sahibine öde.");
chanceCards[6] = new Card("Bank pays you dividend of $50.", function() { addamount(50, 'Chance');}, "Banka sana $50 temettü ödüyor.");
chanceCards[7] = new Card("ADVANCE TO THE NEAREST RAILROAD. If UNOWNED, you may buy it from the Bank. If OWNED, pay owner twice the rental to which they are otherwise entitled.", function() { advanceToNearestRailroad();}, "EN YAKIN DEMİRYOLUNA İLERLE. Sahibi yoksa bankadan satın alabilirsin. Sahibi varsa normal kiranın iki katını öde.");
chanceCards[8] = new Card("Pay poor tax of $15.", function() { subtractamount(15, 'Chance');}, "Yoksulluk vergisi olarak $15 öde.");
chanceCards[9] = new Card("Take a trip to Reading Rail Road. If you pass \"GO\" collect $200.", function() { advance(5);}, "Reading Demiryolu'na git. BAŞLANGIÇ'tan geçersen $200 al.");
chanceCards[10] = new Card("ADVANCE to Boardwalk.", function() { advance(39);}, "Sahil Yolu karesine ilerle.");
chanceCards[11] = new Card("ADVANCE to Illinois Avenue. If you pass \"GO\" collect $200.", function() { advance(24);}, "Illinois Caddesi'ne ilerle. BAŞLANGIÇ'tan geçersen $200 al.");
chanceCards[12] = new Card("Your building loan matures. Collect $150.", function() { addamount(150, 'Chance');}, "İnşaat kredinin vadesi doldu. $150 al.");
chanceCards[13] = new Card("ADVANCE TO THE NEAREST RAILROAD. If UNOWNED, you may buy it from the Bank. If OWNED, pay owner twice the rental to which they are otherwise entitled.", function() { advanceToNearestRailroad();}, "EN YAKIN DEMİRYOLUNA İLERLE. Sahibi yoksa bankadan satın alabilirsin. Sahibi varsa normal kiranın iki katını öde.");
chanceCards[14] = new Card("ADVANCE to St. Charles Place. If you pass \"GO\" collect $200.", function() { advance(11);}, "St. Charles Meydanı'na ilerle. BAŞLANGIÇ'tan geçersen $200 al.");
chanceCards[15] = new Card("Go to Jail. Go Directly to Jail. Do not pass \"GO\". Do not collect $200.", function() { gotojail();}, "Hapse git. Doğrudan hapishaneye git. BAŞLANGIÇ'tan geçme ve $200 alma.");
