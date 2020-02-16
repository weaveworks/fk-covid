docker run --detach \
	--ip 172.17.0.2 \
	-v $PWD/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg \
	haproxy
