'use client';
import { useEffect, useState } from 'react';
import IncompleteProfilePopup from './IncompleteProfilePopup';
import { useSelector } from 'react-redux';

export default function ClientLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {

    const [showModal, setShowModal] = useState(false);
    const { user } = useSelector((state: any) => state.displayUser);
    const handleClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        // if (Object.keys(user).length && !user?.phone_number) {
        if (user && Object.keys(user).length && !user?.is_phone_verified) {
            // if (Object.keys(user).length && !user?.is_phone_verified) {
            timer = setTimeout(() => {
                setShowModal(true);
            }, 30000);
        }
        return () => clearTimeout(timer);
    }, [user])

    return (
        <>
            {showModal && <IncompleteProfilePopup onClose={handleClose} />}
            {children}
        </>
    );
}
