import css from "./Footer.module.css";

export default function Footer() {

return (

<footer className={css.footer}>

  <div className={css.content}>

    <p>
      © {new Date().getFullYear()} NoteHub.
    </p>

    <div>

      <p>
        Developer: Andrii
      </p>

      <p>

        Contact:

        <a href="mailto:student@notehub.app">
          student@notehub.app
        </a>

      </p>

    </div>

  </div>

</footer>

);

}