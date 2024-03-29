namespace Prop {
  export namespace NoteItemType {
    export const TEXTAREA = 'textarea'
    export const IMAGE = 'image'
    export const LINK = 'link'
    export const OPTION = 'option'
    export const SELECT = 'select'
    export const TEXTBOX = 'textbox'
  }

  export const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 300000,
  }
}
export default Prop
