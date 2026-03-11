











#               Get Email value from localStorage
# 
#    const loadEmailRef = useRef<HTMLInputElement>(null)
#
    const onLoad = useCallback(() => {
        if (loadEmailRef.current && loadEmailRef.current.value) {
#            const localStorageValue = localStorage.getItem(loadEmailRef.current?.value)
            if (localStorageValue) {
#                const parsedLocalStorageValue: FormValuesType = JSON.parse(localStorageValue)
                window.alert(parsedLocalStorageValue.firstName)
#                loadEmailRef.current.value = ''
                setValues(parsedLocalStorageValue)
#            } else {
                window.alert('Email not found')
            }
        } else {
            window.alert('Some bug was found!')
        }
    }, []) 
#
#
#


#                     FormValueTypes REF
#
#     const dataRef = useRef<FormValuesType>({
#            firstName: '',
#            lastName: '',
#            email: '',
#            mobileNumber: '',
#            selectedFruit: '',
#            radioButton: null,
#        }) 