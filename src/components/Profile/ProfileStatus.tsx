import {type ChangeEvent, memo, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../redux/redux-store.ts";
import {updateStatusThunk} from "../../redux/profileSlice.ts";

export const ProfileStatus = memo(() => {
    const dispatch = useDispatch<AppDispatch>()
    const status = useSelector((state: RootState) => state.profilePages.status)

    const [editMode, setEditMode] = useState(false)
    const [localStatus, setLocalStatus] = useState(status)

    const inputRef = useRef<HTMLInputElement | null>(null)


    useEffect(() => {
        setLocalStatus(status)
    }, [status])

    useEffect(() => {
        if(editMode && inputRef.current){
            inputRef.current.focus()
        }
    }, [editMode])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        if(localStatus !== status){
            dispatch(updateStatusThunk(localStatus))
        }
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode ? (
                <span onDoubleClick={activateEditMode}>{localStatus || "No Status"}</span>
            ) : (
                <input
                    ref={inputRef}
                    onChange={onStatusChange}
                    onBlur={deactivateEditMode}
                    value={localStatus}
                />
            )}
        </div>
    );
})

