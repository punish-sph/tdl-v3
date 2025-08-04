import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@/Components/atoms/Button";
import Title from "@/Components/atoms/Title";
import clsx from "clsx";

export default function Modal({
    isOpen = false,
    onClose,
    title = "",
    children,
    size = "md",
    variant = "default",
    showCloseButton = true,
    closeOnBackdrop = true,
    closeOnEscape = true,
    preventScroll = true,
    className = "",
    headerClassName = "",
    bodyClassName = "",
    footerClassName = "",
    
    padding = "md",
    headerPadding = "",
    bodyPadding = "",
    footerPadding = "",
    
    showFooter = false,
    primaryButton,
    secondaryButton,
    footerContent,
    
    isLoading = false,
    loadingText = "Memproses...",
    
    type = "info",
    icon,
    message = "",
}) {
    const modalRef = useRef(null);
    const previousActiveElement = useRef(null);

    const sizeClasses = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl", 
        xl: "max-w-4xl",
        "2xl": "max-w-6xl",
        full: "max-w-full mx-4 my-4 h-[calc(100vh-2rem)]",
    };

    const paddingClasses = {
        none: "",
        xs: "p-2",
        sm: "p-3", 
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
        "2xl": "p-12",
    };

    const getPaddingClass = (specificPadding, generalPadding) => {
        if (specificPadding) {
            return paddingClasses[specificPadding] || specificPadding;
        }
        return paddingClasses[generalPadding] || paddingClasses.md;
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.2 }
        },
        exit: { 
            opacity: 0, 
            scale: 0.95,
            transition: { duration: 0.15 }
        }
    };

    const typeConfig = {
        info: {
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-200"
        },
        success: {
            color: "text-lime-600", 
            bg: "bg-lime-50",
            border: "border-lime-200"
        },
        warning: {
            color: "text-yellow-600",
            bg: "bg-yellow-50", 
            border: "border-yellow-200"
        },
        danger: {
            color: "text-red-600",
            bg: "bg-red-50",
            border: "border-red-200"
        }
    };

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape" && closeOnEscape) {
                onClose?.();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, closeOnEscape, onClose]);

    useEffect(() => {
        if (!preventScroll) return;

        if (isOpen) {
            previousActiveElement.current = document.activeElement;
            document.body.style.overflow = "hidden";
            
            if (modalRef.current) {
                modalRef.current.focus();
            }
        } else {
            document.body.style.overflow = "";
            
            if (previousActiveElement.current) {
                previousActiveElement.current.focus();
            }
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen, preventScroll]);

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget && closeOnBackdrop) {
            onClose?.();
        }
    };

    const renderConfirmationContent = () => (
        <div className="text-center space-y-4">
            {icon && (
                <div className={clsx(
                    "w-16 h-16 rounded-full mx-auto flex items-center justify-center",
                    typeConfig[type].bg,
                    typeConfig[type].border,
                    "border-2"
                )}>
                    <div className={clsx("w-8 h-8", typeConfig[type].color)}>
                        {icon}
                    </div>
                </div>
            )}
            
            {title && (
                <Title 
                    text={title} 
                    size="lg" 
                    align="center"
                    className="text-gray-800"
                />
            )}
            
            {message && (
                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                    {message}
                </p>
            )}
            
            {children}
        </div>
    );

    const renderLoadingContent = () => (
        <div className="text-center space-y-4 py-8">
            <div className="w-12 h-12 mx-auto">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-lime-200 border-t-lime-600"></div>
            </div>
            <p className="text-gray-600">{loadingText}</p>
        </div>
    );

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={handleBackdropClick}
                />

                <motion.div
                    ref={modalRef}
                    className={clsx(
                        "relative bg-white rounded-xl shadow-2xl w-full",
                        sizeClasses[size],
                        size === "full" ? "overflow-hidden" : "max-h-[90vh] overflow-hidden",
                        className
                    )}
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    tabIndex={-1}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={title ? "modal-title" : undefined}
                >
                    {(title || showCloseButton) && variant !== "confirmation" && !isLoading && (
                        <div className={clsx(
                            "flex items-center justify-between border-b border-gray-200",
                            getPaddingClass(headerPadding, padding),
                            headerClassName
                        )}>
                            {title && (
                                <Title 
                                    id="modal-title"
                                    text={title} 
                                    size="lg"
                                    className="text-gray-800"
                                />
                            )}
                            
                            {showCloseButton && (
                                <Button
                                    variant="success"
                                    size="md"
                                    icon={XMarkIcon}
                                    onClick={onClose}
                                    className="-mr-2"
                                    aria-label="Tutup modal"
                                />
                            )}
                        </div>
                    )}

                    <div className={clsx(
                        variant === "confirmation" || isLoading ? getPaddingClass(bodyPadding, padding) : getPaddingClass(bodyPadding, padding),
                        size === "full" ? "flex-1 overflow-auto" : "max-h-[60vh] overflow-auto",
                        bodyClassName
                    )}>
                        {isLoading ? renderLoadingContent() : 
                         variant === "confirmation" ? renderConfirmationContent() : 
                         children}
                    </div>

                    {(showFooter || footerContent || primaryButton || secondaryButton) && !isLoading && (
                        <div className={clsx(
                            "flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50",
                            getPaddingClass(footerPadding, padding),
                            variant === "confirmation" && "justify-center",
                            footerClassName
                        )}>
                            {footerContent ? (
                                footerContent
                            ) : (
                                <>
                                    {secondaryButton && (
                                        <Button
                                            variant="ghost"
                                            theme="dark"
                                            onClick={secondaryButton.onClick || onClose}
                                            disabled={secondaryButton.disabled}
                                            {...secondaryButton.props}
                                        >
                                            {secondaryButton.text || "Batal"}
                                        </Button>
                                    )}
                                    
                                    {primaryButton && (
                                        <Button
                                            variant={primaryButton.variant || "success"}
                                            onClick={primaryButton.onClick}
                                            disabled={primaryButton.disabled}
                                            isLoading={primaryButton.isLoading}
                                            {...primaryButton.props}
                                        >
                                            {primaryButton.text || "Konfirmasi"}
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                    )}

                    {variant === "confirmation" && showCloseButton && !isLoading && (
                        <Button
                            variant="ghost"
                            theme="dark"
                            size="sm"
                            icon={XMarkIcon}
                            onClick={onClose}
                            className="absolute top-4 right-4"
                            aria-label="Tutup modal"
                        />
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}