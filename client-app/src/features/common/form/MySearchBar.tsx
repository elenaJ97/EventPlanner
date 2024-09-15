import { observer } from "mobx-react-lite";
import { useReducer } from "react";
import { Link } from "react-router-dom";
import { Label, Search, SearchProps } from "semantic-ui-react";
import PropTypes from 'prop-types'

interface Props {
    searchData: any[],
    searchBy: string,
    searchIcon: string,
    type: string
}

export default observer(function MySearchBar({ searchData, searchBy, searchIcon, type }: Props) {
    const initialState = {
        loading: false,
        results: [],
        value: '',
    }

    function reducer(state: any, action: any) {
        switch (action.type) {
            case 'CLEAN_QUERY':
                return initialState
            case 'START_SEARCH':
                return { ...state, loading: true, value: action.query }
            case 'FINISH_SEARCH':
                return { ...state, loading: false, results: action.results }
            case 'UPDATE_SELECTION':
                return { ...state, value: action.selection }

            default:
                throw new Error()
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    let { loading, results, value } = state;

    function handleSearchChange(_: React.MouseEvent<HTMLElement>, data: SearchProps) {
        dispatch({ type: 'START_SEARCH', query: data.value })

        if (!!data && !!data.value && data.value.length === 0) {
            dispatch({ type: 'CLEAN_QUERY' })
            return
        }

        dispatch({
            type: 'FINISH_SEARCH',
            results: searchData.filter((u: { title: string; }) => u.title.toLowerCase().includes(data.value!.toLowerCase())),
        })
    }

    const resultRenderer = (props: SearchProps) =>
        <>

            {(type === 'events' ?
                <Label basic style={{ width: '100%', height: '100%' }} key={props.title} as={Link} to={`/${type}/${props.eventid}`}>
                    <Label basic style={{ width: '100%', height: '100%', border: 'none' }}>{props.title}</Label>
                    <br />
                    <Label basic style={{ width: '100%', height: '100%', border: 'none' }}>{props.location}</Label>
                </Label> :
                <Label basic style={{ width: '100%', height: '100%' }} key={props.title} as={Link} to={`/${type}/${props.title}`}>
                    <Label basic style={{ width: '100%', height: '100%', border: 'none' }}>{props.display}</Label>
                    <br />
                    <Label basic style={{ width: '100%', height: '100%', border: 'none' }}>{props.title}</Label>                    
                </Label>
            )}
        </>

    resultRenderer.propTypes = {
        title: PropTypes.string,
        location: PropTypes.string,
        eventid: PropTypes.string,
        display: PropTypes.string,
    }

    return (
        <Search
            loading={loading}
            onResultSelect={(_, data) =>
                dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })
            }
            onSearchChange={handleSearchChange}
            resultRenderer={resultRenderer}
            onBlur={() => dispatch({ type: 'CLEAN_QUERY' })}
            noResultsMessage={false}
            results={results}
            value={value}
            icon={`${searchIcon}`}
            placeholder={`Search by ${searchBy}`}
        />
    )
})