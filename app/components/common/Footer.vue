<template>
  <footer class="footer">
    <div class="container">
      <div class="grid">
        <p class="question">Is there a project?</p>

        <div class="appeal">
          <p aria-hidden="true"><span>Let’s work</span> <span>to</span>g<span>ether</span></p>
          <p class="sr-only">Let’s work together</p>
        </div>
  
        <ul class="contacts">
          <li class="contacts__item">
            <p>For all questions</p>
            <a href="tel:+79202780068">+7 (920) 278—00—68</a>
            <a href="mailto:qtim@agency.com">qtim@agency.com</a>
          </li>
          <li class="contacts__item">
            <p>Office in Russia</p>
            <address>139 Ruben Station Lake Drew,<br>NM 52678</address>
            <a class="contacts__location" href="https://maps.app.goo.gl/KsZZQy5zz98FvjDF9" target="_blank" rel="noopener noreferrer">
              <Icon name="location" :size="12" />
            </a>
          </li>
          <li class="contacts__item">
            <p>Office in Dubai</p>
            <address>139 Ruben Station Lake Drew,<br>NM 52678</address>
            <a class="contacts__location" href="https://maps.app.goo.gl/KsZZQy5zz98FvjDF9" target="_blank" rel="noopener noreferrer">
              <Icon name="location" :size="12" />
            </a>
          </li>
        </ul>
      </div>

      <ul class="socials">
        <li class="socials__item">
          <a class="socials__link" href="" target="_blank" rel="noopener noreferrer">Facebook</a>
        </li>
        <li class="socials__item">
          <a class="socials__link" href="" target="_blank" rel="noopener noreferrer">Instagram</a>
        </li>
        <li class="socials__item">
          <a class="socials__link" href="" target="_blank" rel="noopener noreferrer">Telegram</a>
        </li>
        <li class="socials__item">
          <a class="socials__link" href="" target="_blank" rel="noopener noreferrer">Behance</a>
        </li>
        <li class="socials__item">
          <a class="socials__link" href="" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </li>
        <li class="socials__item">
          <a class="socials__link" href="" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        </li>
      </ul>

      <button class="button">Go</button>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-purple-primary);
}

.container {
  position: relative;
  overflow: hidden;
  padding-top: 14rem;
  padding-bottom: 3rem;
}

.grid {
  display: grid;
  grid-template-columns: 46.4rem 1fr;
  grid-template-areas:
  'question question'
  'appeal contacts';
  column-gap: 36.8rem;
  row-gap: 5.6rem;
  margin-bottom: 27.3rem;
}

.question {
  grid-area: question;
  letter-spacing: 0.01em;
}

.appeal {
  grid-area: appeal;
  font-size: 11.2rem;
  line-height: 1;
}

.appeal span {
  text-decoration-line: underline;
  text-decoration-thickness: 0.1rem;
  text-underline-offset: 1.4rem;
}

.contacts {
  grid-area: contacts;
  list-style-type: none;
  margin: 0;
  padding: 0;
  letter-spacing: 0.01em;
}

.contacts__item + .contacts__item {
  margin-top: 3.6rem;
}

.contacts__item > * {
  display: block;
}

.contacts__item > p {
  margin-bottom: 1.2rem;
}

.contacts__item > a + a {
  margin-top: 0.4rem;
}

.contacts__item > address {
  font-style: normal;;
}

.contacts__location {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.8rem;
  width: 3.2rem;
  height: 3.2rem;
  background-color: var(--color-dark-primary);
  border-radius: 50%;
}

.socials {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.socials__item + .socials__item {
  margin-left: 3.2rem;
}

.socials__item:nth-child(3) {
  margin-right: auto;
}

.socials__item .socials__link {
  letter-spacing: 0.01em;
  text-decoration: underline;
  text-decoration-thickness: 0.1rem;
  text-underline-offset: 0.6rem;
}

.button {
  --button-size: 35.8rem;
  --button-half-size: calc(var(--button-size) / 2);
  position: absolute;
  left: calc(50% - (var(--button-size) / 2));
  bottom: 0;
  width: var(--button-size);
  height: var(--button-half-size);
  padding: 12.2rem 0 2.5rem;
  font-size: 3.2rem;
  line-height: 1;
  color: var(--color-gray-secondary);
  background-color: var(--color-dark-primary);
  border: none;
  border-top-left-radius: var(--button-half-size);
  border-top-right-radius: var(--button-half-size);
  transition: all 0.3s ease-in-out;
}

.button:hover,
.button:focus {
  scale: 1.1;
}
</style>