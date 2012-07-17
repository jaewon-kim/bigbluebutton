package org.bigbluebutton.modules.whiteboard.models
{
	import flash.events.IEventDispatcher;
	
	import mx.collections.ArrayCollection;
	
	import org.bigbluebutton.common.LogUtil;
	import org.bigbluebutton.modules.whiteboard.business.shapes.GraphicObject;
	import org.bigbluebutton.modules.whiteboard.events.WhiteboardDrawEvent;

	public class WhiteboardModel
	{
		private var _presentations:ArrayCollection = new ArrayCollection();
		private var _currentPresentation:Presentation;
		
        private var _dispatcher:IEventDispatcher;
        
        public function WhiteboardModel(dispatcher:IEventDispatcher) {
            LogUtil.debug("****** WHITEBOARD MODEL INIT ******");
            _dispatcher = dispatcher;
        }		
		
		public function addAnnotation(annotation:GraphicObject):void {
			_currentPresentation.addAnnotation(annotation);
			_dispatcher.dispatchEvent(new WhiteboardDrawEvent(WhiteboardDrawEvent.NEW_SHAPE));
		}
		
		public function removeAnnotation(id:String):void {
			
		}
		
		public function undo():void {
			_currentPresentation.undo();
//			_dispatcher.dispatchEvent(new WhiteboardDrawEvent(WhiteboardDrawEvent.UNDO_SHAPE));
		}
		
		public function clear():void {
			_currentPresentation.clear();
//			_dispatcher.dispatchEvent(new WhiteboardDrawEvent(WhiteboardDrawEvent.CLEAR_BOARD));
		}

		public function changePresentation(parenationID:String, numberOfSlide:int):void {
			
		}
		
		public function changePage(pageNum:int, numAnnotations:int):void {
			
		}
		
		public function enable(enabled:Boolean):void {
			
		}
	}
}