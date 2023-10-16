import { useHistory } from "react-router-dom";
import "./SearchResults.css"

function SearchResults({ input, setInput, results, setResults }) {
    const history = useHistory()
    const handleClick = (projectId) => {
        history.push(`/projects/${projectId}`)
        setResults([])
        setInput("")
    }
    return (
        <div className="result-container">
            {results.map((result) => {
                return(
                    <div className="search-result" onClick={() => handleClick(result.id)}>
                        {result.name}
                    </div>
                )
            })}
        </div>
)
}
export default SearchResults
