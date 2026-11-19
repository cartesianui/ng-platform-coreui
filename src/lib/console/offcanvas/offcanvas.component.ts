import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, inject } from '@angular/core';
import { ACTIONS_HEADER_HOST, ActionsHeaderSlot } from '@cartesianui/platform-common';

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  standalone: false,
  // `providers`, not `viewProviders`: the forms are PROJECTED into the drawer from the listing's
  // template, and only `providers` reach projected content.
  providers: [{ provide: ACTIONS_HEADER_HOST, useFactory: () => new ActionsHeaderSlot() }],
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

      /* Title bar: [title …][actions][×]. The title takes the room that is left and truncates
         (full text in its tooltip). When the actions don't fit beside the title they wrap onto a
         second line under it. The × is pinned to the first line, in a column of its own, so
         nothing can slide under it; it still comes last in the DOM, so focus runs title →
         actions → ×. Every first-line item shares one height, the action buttons' (2.375rem); with
         0.5rem padding the bar stays 54px, the same as a title-only drawer had, so the form gets
         the whole former action row back. */
      .offcanvas-header {
        --app-offcanvas-header-row: 2.375rem;
        --app-offcanvas-header-gap: 0.75rem;
        --app-offcanvas-close-size: 2rem;
        position: relative;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem var(--app-offcanvas-header-gap);
        padding-block: 0.5rem;
        padding-inline-end: calc(var(--cui-offcanvas-padding-x) + var(--app-offcanvas-close-size) + var(--app-offcanvas-header-gap));
      }
      .offcanvas-title {
        flex: 1 1 12rem;
        min-width: 0;
        min-height: var(--app-offcanvas-header-row);
        line-height: var(--app-offcanvas-header-row);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .offcanvas-header-actions {
        display: flex;
        flex: 0 1 auto;
        min-width: 0;
        margin-inline-start: auto;
        align-items: center;
        min-height: var(--app-offcanvas-header-row);
      }
      .offcanvas-header-actions:empty {
        display: none;
      }
      .offcanvas-header > .btn-close {
        position: absolute;
        top: 0.5rem;
        inset-inline-end: var(--cui-offcanvas-padding-x);
        width: var(--app-offcanvas-close-size);
        height: var(--app-offcanvas-header-row);
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .offcanvas-body {
        overflow-y: auto;
        flex: 1 1 auto;
        min-height: 0; /* required for flex child scroll in many browsers */
      }

    `
  ]
})
export class OffcanvasComponent implements OnInit, OnDestroy {
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

  @ViewChild('headerActions', { static: true }) private headerActions: ElementRef<HTMLElement>;
  private readonly headerSlot = inject(ACTIONS_HEADER_HOST, { self: true }) as ActionsHeaderSlot;

  ngOnInit(): void {
    this.headerSlot.connect(this.headerActions.nativeElement);
  }

  ngOnDestroy(): void {
    this.headerSlot.disconnect();
  }

  public constructor() {}

  // setVisible = (visible: boolean) => {
  //   this.visible = visible;
  // }

  // visibilityChanged = (visible: boolean) => {
  //   this.visibleChange.emit(visible);
  // }
}
