<template>
  <Menu v-model="currentSection"></Menu>

  <ScrollIndicator></ScrollIndicator>

  <Scroller v-model="currentSection">
    <Section background="pattern0" class="profile">
        <div class="avatar">
            <img src="./assets/img/me.png" alt="">
        </div>
        <div class="details">
            <h1>Tim Dusser-Jolly</h1>
            <h2>Web Developer</h2>
        </div>
    </Section>

    <Section background="pattern1">
        <h3>About Me</h3>
        <p>23yo living in France.</p>
        <p>Passionate about code and design.</p>
        <p>I love Nodejs, Vue.js, Electron, IPFS, UI/UX and more :)</p>
    </Section>

    <Section background="pattern0" class="work">
        <h3>My Work</h3>

        <Viewer :items="works"></Viewer>
    </Section>

    <Section background="pattern1" class="socials">
        <h3>Socials</h3>
        <div class="links">
            <a href="mailto:tymmesyde@gmail.com">
                <ion-icon name="mail"></ion-icon>
            </a>
            <a href="https://github.com/tymmesyde" target="blank">
                <ion-icon name="logo-github"></ion-icon>
            </a>
            <a href="https://dribbble.com/tymmesyde" target="blank">
                <ion-icon name="logo-dribbble"></ion-icon>
            </a>
        </div>
    </Section>
  </Scroller>
</template>

<script>
import Menu from '@/components/Menu';
import ScrollIndicator from '@/components/ScrollIndicator';
import Scroller from '@/components/Scroller';
import Section from '@/components/Section';
import Viewer from '@/components/Viewer';

export default {
    name: 'App',
    data() {
        return {
            currentSection: 0,
            works: [
                {
                    title: 'Dolem',
                    description: 'A tracker blocker for desktop.',
                    link: 'https://github.com/tymmesyde/dolem',
                    preview: '/img/work/dolem.png'
                },
                {
                    title: 'Peario',
                    description: 'A website to watch Stremio streams together.',
                    link: 'https://github.com/tymmesyde/peario-client',
                    preview: '/img/work/peario.png'
                }
            ]
        }
    },
    components: {
        Menu,
        ScrollIndicator,
        Scroller,
        Section,
        Viewer
    }
}
</script>

<style lang="scss">
@import './assets/scss/main.scss';

#app {
    .profile {
        .content {
            gap: 25px;
        }

        .avatar {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 200px;
            width: 200px;
            border-radius: 100%;
            border: 5px solid $secondary-color;
            background-color: $tertiary-color;
            overflow: hidden;
            transition: transform 0.15s ease-in-out;

            img {
                width: 100%;
                filter: blur(10px);
                transition: filter 0.3s ease-in-out;
            }

            &:hover {
                transform: scale(1.05);
                
                img {
                    filter: blur(0px);
                }
            }
        }

        .details {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            line-height: 45px;
        }
    }

    .work {
        .content {
            gap: 25px;
        }
    }

    .socials {
        .content { 
            gap: 20px;

            .links {
                display: flex;
                align-items: center;
                gap: 30px;
                font-family: 'Poppins-Regular';
                font-size: 50px;
            }
        }
    }
}
</style>
