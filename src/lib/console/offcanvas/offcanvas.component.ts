import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  standalone: false,
  styles: [
    `
      /* ensure the offcanvas takes full viewport height and body doesn't scroll */
      .offcanvas {
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
        z-index: 1050;
      }

      /* CoreUI's c-offcanvas renders an inner wrapper <div> between the
         .offcanvas host and header/body. Without a bounded flex column on it,
         .offcanvas-body sizes to its content and runs past the viewport, so
         height-bounded documents (bounded-form: SO/PO/DN/RN/…) get their
         bottom clipped instead of scrolling. Bind the wrapper to the host. */
      ::ng-deep c-offcanvas.offcanvas > div {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 0;
      }

      /* keep header fixed, let body scroll internally */
      .offcanvas-header {
        flex-shrink: 0;
      }
      .offcanvas-body {
        overflow-y: auto;
        flex: 1 1 auto;
        min-height: 0; /* required for flex child scroll in many browsers */
        /* Centre and cap the content at a comfortable width on wide screens
           (design spec §3). Done with padding, not a wrapper, so the scrollbar
           stays at the drawer edge and bounded-form documents keep height:100%.
           Below the cap the normal CoreUI padding applies. */
        --oc-content-max: var(--ct-offcanvas-content-doc);
        padding-inline: max(var(--cui-offcanvas-padding-x, 1rem), calc((100% - var(--oc-content-max)) / 2));
      }

      /* Narrower tier for simple / master-data / party forms. */
      :host(.offcanvas-narrow) .offcanvas-body {
        --oc-content-max: var(--ct-offcanvas-content-form);
      }
    `
  ]
})
export class OffcanvasComponent {
  @Input() id: string;
  @Input() title: string;
  @Input() subTitle: string;
  @Input() visible: boolean = false;

  /**
   * Optional override for the drawer's width, e.g. `min(900px, 95vw)`.
   *
   * Omitted, CoreUI's own `.offcanvas-end` width applies — so every existing
   * caller is unaffected. Set it when the panel hosts something that genuinely
   * needs the room, such as a side-by-side layout that would otherwise be
   * squeezed into a single narrow column.
   */
  @Input() width?: string;

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();

  public constructor() {}

  // setVisible = (visible: boolean) => {
  //   this.visible = visible;
  // }

  // visibilityChanged = (visible: boolean) => {
  //   this.visibleChange.emit(visible);
  // }
}
