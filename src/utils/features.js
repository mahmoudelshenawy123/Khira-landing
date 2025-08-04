// export const emailPattern =/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
export const emailPattern =/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
export const linkPattern =/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
export const passwordPattern =/^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/
export const phonePattern =/^[\+]?971?[0-9]{4,10}$/
export const whtsAppConnect=(whatsAppNumber,whatsMessage='')=>`https://api.whatsapp.com/send?phone=${whatsAppNumber}&text=Welcome To Friends Car Rental - ${whatsMessage}`
export const emailConnect =(email)=>`mailto:${email}?subject=SendMail&body=Description`