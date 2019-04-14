import $ from 'jquery';

class Hamburger {
	constructor( trigger, target, eventType ) {
		this.trigger = trigger;
		this.target = target;
		this.eventType = eventType;
		this.activeClass = 'is-active';
		this.clientWidth = document.body.clientWidth;
		this.noScrollBarWidth = document.body.clientWidth;
		this.diff = 0;
	}

	init() {
		this.toggle();
	}

	toggle() {
		$( document ).on( this.eventType, this.trigger, event => {
			event.preventDefault();

			if ( $( event.currentTarget ).hasClass( this.activeClass ) ) {
				$( 'body' ).removeClass( 'hamburger-active' );

				/**
				 * bodyタグのoverflowプロパティとpaddingを削除
				 */
				$( 'body' ).removeAttr( 'style' );
				$( '.js-header' ).removeAttr( 'style' );

				$( event.currentTarget ).removeClass( this.activeClass );
				$( this.target ).removeClass( this.activeClass );
				$( event.currentTarget )
					.parents( '.js-header' )
					.removeClass( this.activeClass );
			} else {

				/**
				 * IEでスクロールバーの影響で表示がガタつく事象に対応
				 */
				function bugFixForIE() {
					this.clientWidth = document.body.clientWidth;
					document.body.style.overflow = 'hidden';

					this.noScrollBarWidth = document.body.clientWidth;
					this.diff = this.noScrollBarWidth - this.clientWidth;

					if ( 0 < this.diff ) {
						$( '.js-header' ).css( 'padding-right', 30 + this.diff + 'px' );
					}
				}
				bugFixForIE.call( this );

				$( 'body' ).addClass( 'hamburger-active' );

				$( event.currentTarget ).addClass( this.activeClass );
				$( this.target ).addClass( this.activeClass );
				$( event.currentTarget )
					.parents( '.js-header' )
					.addClass( this.activeClass );
			}
		});
	}
}

export default Hamburger;
