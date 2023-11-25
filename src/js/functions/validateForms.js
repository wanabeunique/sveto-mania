import JustValidate from 'just-validate';
import Inputmask from "inputmask/bundle.js";

export default function validateForms (selector, rules, afterSend) {
  const form = document?.querySelector(selector);
  const telSelector = form?.querySelector('input[type="tel"]');

  if (!form) {
    console.error('Нет такого селектора!');
    return false;
  }

  if (!rules) {
    console.error('Вы не передали правила валидации!');
    return false;
  }

  if (telSelector) {
    const inputMask = new Inputmask('+7 (999) 999-99-99');
    inputMask.mask(telSelector);

    for (let item of rules) {
      if (item.tel) {
        item.rules.push({
          rule: 'function',
          validator: function() {
            const phone = telSelector.inputmask.unmaskedvalue();
            return phone.length === 10;
          },
          errorMessage: item.telError
        });
      }
    }
  }

  const validation = new JustValidate(selector);

  for (let item of rules) {
    validation
      .addField(item.ruleSelector, item.rules);
  }

  validation.onSuccess((ev) => {
    let formData = new FormData(ev.target);
    const phone = document.querySelector('.calculator__input').value
    const price = document.querySelector('.calculator__price').innerHTML
    const invoice = document.querySelector('.calculator__invoice').querySelector('.calculator__field.active').innerHTML
    const company = document.querySelector('.calculator__company').querySelector('.calculator__field.active').innerHTML
    const space = document.querySelector('.calculator__space').innerHTML
    const corner = document.querySelector('.calculator__corner').innerHTML
    const lamp = document.querySelector('.calculator__lamp').innerHTML
    const lamp2 = document.querySelector('.calculator__lamp--secondary').innerHTML

    formData.append('Телефон', phone)
    formData.append('Стоимость', price)
    formData.append('Фактура', invoice)
    formData.append('Производитель', company)
    formData.append('Площадь', space)
    formData.append('Углы', corner)
    formData.append('Светильники', lamp)
    formData.append('Люстры', lamp2)

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (afterSend) {
            afterSend();
          }
          console.log('Отправлено');
        }
      }
    }

    xhr.open('POST', './resources/mail.php', true);
    xhr.send(formData);

    ev.target.reset();
  })

};
