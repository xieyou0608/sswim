function s(e){
    //e.preventDefault();
    let name = document.getElementById("name").value
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
    let year = document.getElementById("year").value
    let month = document.getElementById("month").value
    let day = document.getElementById("day").value
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
        name:name,
        email:email,
        phone:phone,
        ident:ident,
        contact_person:contact_person,
        contact_number:contact_number,
        dept:dept,
        year:year,
        month:month,
        day:day,
        size:size,
        isVeg:isVeg,
        otherMessage: otherMessage
    }
    if(name && email && phone && ident && contact_number && contact_person && dept != "none" && year && month && day
        && size){
        sendData(all)
        }
}
function knowledgeStart(e){
    console.log(1)
}