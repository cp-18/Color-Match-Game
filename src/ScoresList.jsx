
export default function ScoresList({ scores }) {

    return (
        <>
            <ol>
                {scores.map(score => {
                    return (
                        <li key={score.id}> {score.text} </li>
                    )
                })}

            </ol>
        </>
    )
}