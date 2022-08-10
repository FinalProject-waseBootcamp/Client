import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { System } from '../utils/modals';
import Stack from '@mui/material/Stack';
import swal from 'sweetalert';
import Button from '@mui/material/Button';


export default function MySystem() {

    const [myBusiness, setMyBusiness] = useState<System[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getBusiness();
    }, [])

    const d = async (uid: string) => {
        try {

            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this business!",
                icon: "warning",
                // buttons: true,
                dangerMode: true,
            })
                .then(async (willDelete) => {
                    if (willDelete) {
                        const res = await axios.delete(`http://localhost:3333/system/${uid}}`);
                        let status = await res.status;
                        if (status === 200) {
                            swal("Poof! Your business has been deleted!", {
                                icon: "success",
                            });
                        } else {
                            swal("Your business is safe!");
                        }
                    }
                });
        } catch (error) {
            console.log(error);
        }

    }





    const getBusiness = async () => {
        try {
            //get uid manager from mobix
            const managerId = '';
            const res = await axios.get(`http://localhost:3333/system/${managerId}`);
            let myBusiness = await res.data;
            setMyBusiness(myBusiness);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id="allMyBusiness" >
            <Typography gutterBottom variant="h2" component="div" sx={{ textAlign: 'center', padding: '10px', }}>All systems</Typography>
            <Stack padding={3} direction="row" spacing={5} sx={{ '& .MuiCard-root': { m: 5 }, flexWrap: 'wrap' }} >
                <Button variant="contained">add system</Button>
                {myBusiness && myBusiness.map((business: System) =>
                    <Card >
                        <CardMedia
                            component="img"
                            alt="system"
                            height="140"
                            image={business.imgUrl}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {business.topic}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {business.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {business.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="medium" onClick={() => navigate('/editBusines')}>Edit my business settings </Button>
                            <Button size="medium" onClick={()=>d(business.adminId)}>Delete my business settings </Button>
                        </CardActions>
                    </Card>
                )}
            </Stack>
        </div>
    )
}

