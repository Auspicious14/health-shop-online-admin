export function setCookie(name: any, value: any, days: any) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name: any) {
  var nameEQ = name + "=";
  if (typeof document !== "undefined") {
    var ca: any = document.cookie.split(";");
  }
  for (var i = 0; i < ca?.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// setCookie("user_email","bobthegreat@gmail.com",30); //set "user_email" cookie, expires in 30 days
// const userID=getCookie("uuid");//"jbjkbkbjh
