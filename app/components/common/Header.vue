<template>
  <header class="header">
    <NuxtLink to="/" class="logo">
      <Icon name="logo-qtim" :width="84" :height="25" />
    </NuxtLink>

    <nav class="header__navigation navigation">
      <ul class="navigation__list">
        <li>
          <NuxtLink to="/works" class="navigation__link">Works</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about" class="navigation__link">About</NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="buttons">
      <button class="button-language">
        <span class="sr-only">Switch language</span>
        <Icon name="uk-flag" :size="24" />
      </button>
      <button class="button-work">Let’s work</button>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 3.5rem 4rem;
}

.header__navigation {
  margin-left: auto;
  margin-right: 8.7rem;
}

.navigation {
  font-size: 2rem;
  line-height: 1;
}

.navigation__list {
  display: flex;
  column-gap: 5rem;
  margin: 0;
}

.navigation__link {
  display: block;
  padding: 0.4rem;
}

.buttons {
  display: flex;
  align-items: center;
  column-gap: 1.6rem;
}

.button-language {
  padding: 1.2rem;
  background-color: var(--color-white);
  border: 0.2rem solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
}

.button-work {
  padding: 1.6rem 3.2rem;
  font-size: 2rem;
  line-height: 1;
  color: var(--color-white);
  background-color: var(--color-dark-primary);
  border: none;
  border-radius: 2.6rem;
}
</style>