function s(e){
    //e.preventDefault();
    let applier = document.getElementById("applier").value
    let email = document.getElementById("email").value
    let phone = document.getElementById("phone").value
    let ident = document.getElementById("ident").value
    let contact_person = document.getElementById("contact_person").value
    let contact_number = document.getElementById("contact_number").value
    let dept = "none"
    let childOfDept = document.getElementById("dept").children
    let i = 1
    while(i < 6){
        if(childOfDept[i].checked)
            dept = childOfDept[i].id
        i = i + 2
    }
    let bank_acct = document.getElementById("bank_acct").value
    let transfer_date = document.getElementById("transfer_date").value
    let birthday = document.getElementById("birthday").value
    let size = document.getElementById("shirt_size").value
    let isVeg = document.getElementById("veg").checked
    let otherMessage = document.getElementById("message").value

    if(dept == "IM")
        dept = "資訊管理系"
    else if(dept == "Soc")
        dept = "社會學系"
    else
        dept = "社會工作學系"

    let all = {}
    all[ident]={
        name:applier,
        email:email,
        phone:phone,
        ident:ident,
        contact_person:contact_person,
        contact_number:contact_number,
        birthday:birthday,
        bank_acct:bank_acct,
        transfer_date:transfer_date,
        dept:dept,
        size:size,
        isVeg:isVeg,
        otherMessage:otherMessage
    }
    if(applier && email && phone && ident && contact_number && contact_person && dept != "none" && birthday && bank_acct
        && transfer_date && size){
        try{
            sendData(all);
        }
        catch(error){
            alert("報名失敗！請稍後再試一次，或聯絡宿營粉絲團");
            alert(error.name);
            alert(error.message);
        }
    }
}
function knowledgeStart(e){
    console.log(1)
}