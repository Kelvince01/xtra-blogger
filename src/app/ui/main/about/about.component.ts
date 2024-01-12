import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-about',
  standalone: true,
  imports: [],
  template: `
    <div class="blog-page-area mx-auto min-h-screen px-4 py-8 md:w-2/3 md:p-10">
      <div class="blog-page-card pb-32">
        <div
          class="blog-page-content prose prose-lg mx-auto break-words tracking-tight dark:prose-dark xl:prose-xl">
          <h1
            class="blog-page-title mb-10 break-words text-3xl font-bold text-black dark:text-white md:text-4xl xl:text-5xl">
            About
          </h1>
          <div>
            <h3 id="heading-hello-world">👋 Hello world!</h3>
            <p>
              My name is Kelvince Phillips. I'm a Software Engineer (Full Stack) and I've just
              started with blogging. I have 2.5 years of experience in IT &amp; Fintech. Apart from
              my daily job, I love to read tech articles, watch Netflix shows especially Sci-Fi and
              time-traveling stories.
            </p>
            <h3 id="heading-some-things-about-me">🧐 Some Things About Me</h3>
            <ul>
              <li>
                💼 Software Engineer (Frontend) at
                <a href="http://zwitch.io/" target="_blank">
                  Zwitch (Open Financial Technologies, Pvt. Ltd.)
                </a>
                What I do here is pretty big and crazy stuff.
                <br />
              </li>
              <li>
                🎓 Graduation from
                <a href="https://www.coep.org.in/" target="_blank">
                  College of Engineering Pune (COEP 2014-'18)
                </a>
                <br />
              </li>
              <li>
                🌐 Socially available on
                <a href="https://github.com/Kelvince01" target="_blank">Github</a>
                ,
                <a href="https://www.linkedin.com/in/Kelvince/" target="_blank">Linkedin</a>
                ,
                <a href="https://twitter.com/Kelvince_" target="_blank">Twitter</a>
                ,
                <a href="https://www.instagram.com/Kelvince_/" target="_blank">Instagram</a>
                <br />
              </li>
              <li>
                😄 Pronouns: He/him
                <br />
              </li>
              <li>
                🖥️ Coding Environment: Dark 🕶️ + Music 🎧 + Coffee ☕️
                <br />
              </li>
              <li>📚 Currently Learning: Svelte, Web Components and custom Template Engine.</li>
              <li>
                ⚡️ Speaks English and Swahili
                <br />
              </li>
              <li>
                🏰 Hogwarts House: Ravenclaw 🧙🏻‍♂️
                <br />
              </li>
              <li>
                💎 Treasures: Macbook Air M1, Lenovo Legion, iPhone13 (worked my a** off to get this
                🥺)
                <br />
              </li>
              <li>
                🍿 Currently watching: "Hellbound, Wheels of time ❤️, Lost in Space"
                <br />
              </li>
              <li>💬 Favourite Quote:</li>
            </ul>
            <blockquote>
              <p>
                It is our choices, that show what we truly are, far more than our abilities.... -
                Albus Dumbledoor 🪄
              </p>
            </blockquote>
            <h2 id="heading-special-note">🚨 Special note</h2>
            <p>
              I published my first ever npm package [ng-new-app] few months back
              (https://www.npmjs.com/package/ng-new-app)! Do checkout! ⭐️
            </p>
            <p>Let's connect and share our knowledge! 🕊</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {}
