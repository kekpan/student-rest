FilePond.registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType
)

FilePond.setOptions({
    allowFileSizeValidation: true,
    maxFileSize: '5mb',
    labelMaxFileSizeExceeded: 'Το αρχείο υπερβαίνει τα 5mb',
    allowFileTypeValidation: true,
    acceptedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
    labelFileTypeNotAllowed: 'Μη αποδεκτός τύπος αρχείου'
})

FilePond.parse(document.body);