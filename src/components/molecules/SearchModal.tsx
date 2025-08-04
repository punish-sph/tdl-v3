import React, { useState, useRef, useEffect } from "react";
import { router } from "@inertiajs/react";
import clsx from "clsx";
import {
    MagnifyingGlassIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import Modal from "@/Components/molecules/Modal";

export default function SearchModal({
    isOpen = false,
    onClose,
    searchPlaceholder = "Cari halaman, pengguna, konten...",
    quickAccessItems = [],
    onSearch,
    searchResults = [],
    isSearchLoading = false,
    onResultClick,
    className = "",
    size = "lg",
    width = "",
    showQuickAccess = true,
    showKeyboardTip = true,
    emptyStateMessage = "Tidak ada hasil ditemukan",
    loadingMessage = "Mencari...",
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        } else {
            setSearchQuery("");
        }
    }, [isOpen]);

    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        if (onSearch) {
            onSearch("");
        }
        searchInputRef.current?.focus();
    };

    const handleResultClick = (result) => {
        if (onResultClick) {
            onResultClick(result);
        } else {
            router.visit(result.url);
        }
        onClose();
    };

    const baseInputClass = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition duration-200 ease-in-out";
    
    const widthClasses = {
        sm: "max-w-sm",
        md: "max-w-md", 
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        full: "max-w-full",
        auto: "w-auto",
    };
    
    const modalClassName = clsx(
        width && widthClasses[width] ? widthClasses[width] : "",
        className
    );

    const renderQuickAccess = () => {
        if (!showQuickAccess || !quickAccessItems.length) return null;

        return (
            <div>
                <p className="text-sm text-gray-500 mb-2">Sering diakses</p>
                <div className="space-y-1">
                    {quickAccessItems.map((item, index) => (
                        <button
                            key={item.id || index}
                            onClick={() => handleResultClick(item)}
                            className="w-full text-left p-2 rounded-lg hover:bg-lime-50 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                {item.icon && (
                                    <div className="w-8 h-8 bg-lime-100 rounded-lg flex items-center justify-center group-hover:bg-lime-200">
                                        <item.icon className="w-4 h-4 text-lime-600" />
                                    </div>
                                )}
                                <div>
                                    <p className="font-medium text-gray-700 group-hover:text-lime-600">
                                        {item.title}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {item.description || item.url}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const renderSearchResults = () => {
        if (isSearchLoading) {
            return (
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-lime-200 border-t-lime-600"></div>
                    <span className="ml-2 text-gray-600">{loadingMessage}</span>
                </div>
            );
        }

        if (searchResults.length > 0) {
            return (
                <div className="space-y-1">
                    <p className="text-sm text-gray-500 px-1 mb-2">
                        Ditemukan {searchResults.length} hasil
                    </p>
                    {searchResults.map((result) => (
                        <button
                            key={result.id}
                            onClick={() => handleResultClick(result)}
                            className="w-full text-left p-3 rounded-lg hover:bg-lime-50 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-lime-100 rounded-lg flex items-center justify-center group-hover:bg-lime-200">
                                    {result.icon ? (
                                        <result.icon className="w-4 h-4 text-lime-600" />
                                    ) : (
                                        <MagnifyingGlassIcon className="w-4 h-4 text-lime-600" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800 group-hover:text-lime-600">
                                        {result.title}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {result.type ? `${result.type} • ` : ""}{result.description || result.url}
                                    </p>
                                </div>
                                {result.badge && (
                                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                        {result.badge}
                                    </span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            );
        }

        if (searchQuery) {
            return (
                <div className="text-center py-8">
                    <MagnifyingGlassIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">{emptyStateMessage} "{searchQuery}"</p>
                    <p className="text-sm text-gray-400 mt-1">
                        Coba gunakan kata kunci yang berbeda
                    </p>
                </div>
            );
        }

        return null;
    };

    const renderKeyboardTip = () => {
        if (!showKeyboardTip) return null;

        return (
            <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center">
                    Tips: Gunakan{" "}
                    <kbd className="px-1 py-0.5 text-xs bg-gray-100 rounded">
                        ⌘K
                    </kbd>{" "}
                    untuk membuka pencarian cepat
                </p>
            </div>
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title=""
            size={size}
            showCloseButton={false}
            closeOnBackdrop={true}
            closeOnEscape={true}
            bodyClassName="p-6"
            className={modalClassName}
        >
            <div className="space-y-4">
                <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className={clsx(baseInputClass, "pl-10 pr-10")}
                    />
                    {searchQuery && (
                        <button
                            onClick={handleClearSearch}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                        >
                            <XMarkIcon className="w-4 h-4 text-gray-400" />
                        </button>
                    )}
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {searchQuery ? (
                        renderSearchResults()
                    ) : (
                        <div className="space-y-4">
                            {renderQuickAccess()}
                            {renderKeyboardTip()}
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}