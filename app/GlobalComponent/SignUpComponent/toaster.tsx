import {
    Toaster as ChakraToaster,
    Portal,
    Spinner,
    Stack,
    Toast,
    createToaster,
} from "@chakra-ui/react"

export const toaster = createToaster({
    placement: "top-end",
    duration: 5000,
})

export const Toaster = () => {
    return (
        <Portal>
            <ChakraToaster toaster={toaster} insetInline={{ md: "16px" }}>
                {(toast) => (
                    <Toast.Root width={{ md: "sm" }}>
                        {toast.type === "loading" ? (
                            <Spinner size="sm" color="blue.solid" />
                        ) : (
                            <Toast.Indicator />
                        )}
                        <Stack gap="1" flex="1">
                            {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
                            {toast.description && (
                                <Toast.Description>{toast.description}</Toast.Description>
                            )}
                        </Stack>
                        <Toast.CloseTrigger />
                    </Toast.Root>
                )}
            </ChakraToaster>
        </Portal>
    )
}