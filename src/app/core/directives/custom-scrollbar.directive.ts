import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[customScrollbar]',
  standalone: true
})
export class CustomScrollbarDirective {

  hostElement!: HTMLElement

  constructor(
    private element: ElementRef
  ) { }

  @HostListener("mousemove", ["$event"])
  applyCustomScroll(mouseEvent: MouseEvent) {
    this.hostElement = this.element.nativeElement
    const hostElementPosition = this.hostElement?.getBoundingClientRect()
    const rightEdgeWithoutScrollBar = hostElementPosition.right - 10

    if (mouseEvent.clientX >= rightEdgeWithoutScrollBar) {
      this.hostElement?.classList.add("custom-scroll-vertical-hover")
    } else {
      this.hostElement?.classList.remove("custom-scroll-vertical-hover")
    }
  }

  @HostListener("mouseout")
  removeCustomScroll() {
    this.hostElement?.classList.remove("custom-scroll-vertical-hover")
  }

}
