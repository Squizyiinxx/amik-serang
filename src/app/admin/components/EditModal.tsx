import React from 'react';
import { Button } from '@/components/ui/button';
import { MyInputText } from '@/components';

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: { id: string, date: string, title: string }) => void;
    announcement: { id: string; date: string; title: string } | null;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSubmit, announcement }) => {
    const [title, setTitle] = React.useState(announcement?.title || '');
    const [date, setDate] = React.useState(announcement?.date || '');

    React.useEffect(() => {
        if (announcement) {
            setTitle(announcement.title);
            setDate(announcement.date);
        }
    }, [announcement]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Edit Announcement</h2>
                <div className="mb-4">
                    <MyInputText
                        type="date"
                        labelText="Date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        background="bg-white"
                    />
                </div>
                <div className="mb-4">
                    <MyInputText
                        type="text"
                        labelText="Title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        background="bg-white"
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <Button onClick={onClose} className="bg-gray-400 hover:bg-gray-600">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => onSubmit({ id: announcement!.id, date, title })}
                        className="bg-blue-500 hover:bg-blue-700"
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
